import { useRef, useState } from "react"
import { Image, Skeleton } from "@amsterdam/design-system-react"
import usePanoramaByBagId from "@/hooks/usePanoramaByBagId"
import useRect from "./hooks/useRect"
import styles from "./PanoramaPreview.module.css"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
  radius?: number
  fov?: number
}

// One of the aspect ratios of the design system, for the skeleton, the image
// and the request to the panorama service.
const ASPECT_RATIO = "16:9"
const ASPECT = 16 / 9

// The image is asked for in steps of this width, so a few pixels more or less
// room (a scrollbar that appears) don't fetch a new image.
const WIDTH_STEP = 200

/**
 * The street view of an address. The place is reserved from the start, with
 * a skeleton until the first image is there; that image fades in. A later
 * image (after resizing) replaces it once it has loaded, without a skeleton
 * in between.
 */
const PanoramaPreview: React.FC<Props> = ({
  bagId,
  radius = 180,
  fov = 80,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useRect(ref, 100)
  // Not measured yet: no request.
  const requestWidth =
    width > 0 ? Math.ceil(width / WIDTH_STEP) * WIDTH_STEP : undefined
  const { data } = usePanoramaByBagId(bagId, requestWidth, ASPECT, radius, fov)
  // The image that is shown: the last one that finished loading for this address.
  const [shown, setShown] = useState<{ bagId: string; url: string }>()
  const shownUrl = shown?.bagId === bagId ? shown.url : undefined
  const nextUrl = data?.url

  return (
    <div ref={ref} className={styles.container}>
      {shownUrl === undefined ? (
        <Skeleton>
          <Skeleton.Image aspectRatio={ASPECT_RATIO} />
        </Skeleton>
      ) : (
        <Image
          className={styles.image}
          aspectRatio={ASPECT_RATIO}
          src={shownUrl}
          alt={`Panorama preview voor BAG: ${bagId}`}
        />
      )}
      {nextUrl !== undefined && nextUrl !== shownUrl && (
        // Loads out of sight; shown above once it is there.
        <img
          hidden
          alt=""
          src={nextUrl}
          onLoad={() => setShown({ bagId, url: nextUrl })}
        />
      )}
    </div>
  )
}

export default PanoramaPreview

import { useRef, useState } from "react"
import usePanoramaByBagId from "@/hooks/usePanoramaByBagId"
import useRect from "./hooks/useRect"
import styles from "./PanoramaPreview.module.css"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
  width?: number
  aspect?: number
  radius?: number
  fov?: number
}

/**
 * The street view of an address. The place is reserved from the start, with a
 * grey shimmer until the image is there; the image then fades in.
 */
const PanoramaPreview: React.FC<Props> = ({
  bagId,
  width: w,
  aspect = 1.5,
  radius = 180,
  fov = 80,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const rect = useRect(ref, 100)
  const width = w ?? rect.width
  const { data } = usePanoramaByBagId(bagId, width, aspect, radius, fov)
  // The url of the image that has finished loading.
  const [loadedUrl, setLoadedUrl] = useState<string>()
  const isLoaded = data !== undefined && loadedUrl === data.url

  return (
    <div
      ref={ref}
      className={`${styles.container} ${isLoaded ? styles.loaded : ""}`}
      style={{ aspectRatio: aspect }}
    >
      {data ? (
        <img
          // A new image starts hidden again.
          key={data.url}
          className={`${styles.image} ${isLoaded ? styles.imageLoaded : ""}`}
          src={data.url}
          alt={`Panorama preview voor BAG: ${bagId}`}
          onLoad={() => setLoadedUrl(data.url)}
        />
      ) : null}
    </div>
  )
}

export default PanoramaPreview

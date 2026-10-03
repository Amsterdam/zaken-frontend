import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { getCrsRd } from "./getCrsRd"
import MarkerIcon from "./MarkerIcon.svg"
import styles from "./MapView.module.css"

type Props = {
  latitude: number
  longitude: number
  /** What the marker stands for, e.g. the address. */
  label: string
  zoom?: number
}

// The blue marker of ton-frontend, with its size and anchor.
const markerIcon = L.icon({
  iconUrl: MarkerIcon,
  iconSize: [32, 40],
  // The tip of the marker points at the place.
  iconAnchor: [16, 40],
})

// Starts wide enough to see where in the city the place is (7 is the whole
// city, 16 a single building).
const DEFAULT_ZOOM = 6

/**
 * A map of Amsterdam with a marker on one place (after the map of
 * zwd-frontend: Leaflet with the topographic tiles of the city, in the Dutch
 * coordinate system).
 */
export function MapView({
  latitude,
  longitude,
  label,
  zoom = DEFAULT_ZOOM,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current === null) return

    const map = new L.Map(containerRef.current, {
      center: [latitude, longitude],
      zoom,
      layers: [
        L.tileLayer("https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png", {
          attribution: "",
          subdomains: ["t1", "t2", "t3", "t4"],
          tms: true,
        }),
      ],
      maxZoom: 16,
      // The tiles of the city start at this level; further out they are blank.
      minZoom: 7,
      crs: getCrsRd(),
      maxBounds: [
        [52.25168, 4.64034],
        [52.50536, 5.10737],
      ],
      // Scrolling the page must not zoom the map; a click on the map turns it on.
      scrollWheelZoom: false,
    })
    map.on("click mousedown", () => map.scrollWheelZoom.enable())
    map.attributionControl.setPrefix(false)

    L.marker([latitude, longitude], {
      icon: markerIcon,
      alt: label,
      title: label,
      // The marker does nothing; the map itself can be used with the keyboard.
      keyboard: false,
    }).addTo(map)

    return () => {
      map.remove()
    }
  }, [latitude, longitude, label, zoom])

  return (
    <div
      className={styles.container}
      ref={containerRef}
      role="region"
      aria-label={`Kaart van ${label}`}
    />
  )
}

export default MapView

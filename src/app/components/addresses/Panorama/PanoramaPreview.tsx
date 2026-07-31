import { useRef } from "react";

import usePanoramaByBagId from "app/state/rest/custom/usePanoramaByBagId/usePanoramaByBagId";
import useRect from "./hooks/useRect";

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"];
  width?: number;
  aspect?: number;
  radius?: number;
  fov?: number;
};

const PanoramaPreview: React.FC<Props> = ({
  bagId,
  width: w,
  aspect = 1.5,
  radius = 180,
  fov = 80,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRect(ref, 100);
  const width = w ?? rect.width;
  const height = width !== undefined ? width / aspect : undefined;
  const [data] = usePanoramaByBagId(bagId, width, aspect, radius, fov);

  return (
    <div ref={ref} style={{ height, backgroundColor: "#f5f5f5" }}>
      {data ? (
        <img
          style={{ width: "100%" }}
          src={data.url}
          alt={`Panorama preview voor BAG: ${bagId}`}
        />
      ) : null}
    </div>
  );
};

export default PanoramaPreview;

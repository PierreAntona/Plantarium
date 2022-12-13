import * as React from "react";
import area from "@turf/area";
import geojson2svg from "geojson-to-svg";
import { useEffect } from "react";

function GardenGeneration(props) {
  let polygonArea = 0;
  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
  }

  console.log(Math.round(polygonArea * 100) / 100);

  useEffect(() => {
    if (props.polygons[0]) {
      
      const geojson = {
          type: "Feature",
          properties: { id: props.polygons[0].id, type: "Polygon" },
          geometry: {
            type: "Polygon",
            coordinates: [props.polygons[0].geometry.coordinates],
          },
        }

        const svg = geojson2svg()
        .styles({ Polygon: { fill: "rgba(198, 193, 185, 0.4)", strokeWidth: 0} })
        .data(geojson)
        .render()

      console.log(svg);
    }
  }, [props]);

  return null;
}

export default React.memo(GardenGeneration);

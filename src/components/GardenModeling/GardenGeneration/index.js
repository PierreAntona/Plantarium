import * as React from "react";
import area from "@turf/area";
import { useEffect, useState } from "react";
import css from "./index.module.scss";
import Link from "next/link";

function GardenGeneration(props) {
  const [gardenSvg, setGardenSvg] = useState();

  let coordinatesString = "";
  let polygonArea = 0;
  let Xmin = 99999;
  let Ymin = 99999;
  let Xmax = 0;
  let Ymax = 0;

  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
  }

  const gardenSize = Math.round(polygonArea * 100) / 100;

  useEffect(() => {
    if (props.polygons[0]) {
      const coordinates = props.polygons[0].geometry.coordinates[0];
      coordinates.forEach((coordinate) => {
        const newCoordinate = props.map.current.project(coordinate);

        if (Xmin > newCoordinate.x) {
          Xmin = newCoordinate.x;
        }
        if (Ymin > newCoordinate.y) {
          Ymin = newCoordinate.y;
        }

        if (Xmax < newCoordinate.x) {
          Xmax = newCoordinate.x;
        }
        if (Ymax < newCoordinate.y) {
          Ymax = newCoordinate.y;
        }

        coordinatesString += `${newCoordinate.x},${newCoordinate.y} `;
      });

      const viewBox = `${Xmin} ${Ymin} ${Xmax - Xmin} ${Ymax - Ymin}`;
      const SVG = `<svg viewbox="${viewBox}" xmlns="http://www.w3.org/2000/svg"><polygon points="${coordinatesString}" fill="#C6C1B9" fill-opacity="0.4" stroke="#322306" stroke-dasharray="5 5" stroke-width="0.5" /></svg>`;

      setGardenSvg(SVG);
    }
  }, [props]);

  return gardenSvg ? (
    <div className={css.container}>
      <span>Vous inscrire</span>
      <Link
        href={{
          pathname: "/login",
          query: { 
            page: "signin", 
            gardenSvg: gardenSvg,
            gardenSize: gardenSize         
          },
        }}
      >
        Valider
      </Link>
    </div>
  ) : null;
}

export default React.memo(GardenGeneration);

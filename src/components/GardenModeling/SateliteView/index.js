import css from "./index.module.scss";
import Map, {
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { useCallback, useRef, useState } from "react";
import GardenGeneration from "../GardenGeneration";
import DrawControl from "../DrawControl";

export default function SateliteView({ setDisplayMap, displayMap }) {
  const [lockLocation, setLockLocation] = useState();
  const [features, setFeatures] = useState({});
  const refMap = useRef(null);

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <div className={css.container}>
      {!lockLocation && (
        <div className={css.return} onClick={() => setDisplayMap(!displayMap)}>
          <span>Retour</span>
        </div>
      )}

      <div className={css.button} onClick={() => setLockLocation(!lockLocation)}>
        {lockLocation ? <span>Modifier la localisation</span> : <span>Dessiner les contours du jardin</span> }   
        {lockLocation ? <img src="/img/pin.png" /> : <img src="/img/plume.png" />}
      </div>

      <Map
        ref={refMap}
        initialViewState={{
          longitude: 2.5,
          latitude: 48.5,
          zoom: 5,
        }}
        mapStyle="https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
        dragRotate={false}
        // scrollZoom={lockLocation?false:true}
      >
        {!lockLocation && (
          <NavigationControl
            showCompass={false}
            style={{ marginRight: "3rem", marginTop: "2rem" }}
          />
        )}

        {!lockLocation && (
          <ScaleControl style={{ marginLeft: "3rem", marginBottom: "2rem" }} />
        )}

        {!lockLocation && <GeolocateControl style={{ marginRight: "3rem" }} />}

        {lockLocation && (
          <DrawControl
            position="top-left"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
            defaultMode="draw_polygon"
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        )}
      </Map>
      {lockLocation && (
        <GardenGeneration
          map={refMap}
          polygons={Object.values(features)}
          style={{ marginLeft: "3rem", marginTop: "2rem" }}
        />
      )}
    </div>
  );
}

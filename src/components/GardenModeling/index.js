import css from "./index.module.scss";
import { useState, useEffect } from "react";
import SateliteView from "./SateliteView";

export default function GardenModeling() {
  const [displayMap, setDisplayMap] = useState(false);

  return (
    <div className={css.container}>
      <span className={css.question}>
        Bienvenue sur Plantarium,
        <br />
        votre gestionnaire de jardin en 2D
      </span>
      <div className={css.button} onClick={() => setDisplayMap(!displayMap)}>
        <span>Créer mon jardin</span>
      </div>
      {displayMap && (
        <SateliteView
          displayMap={displayMap}
          setDisplayMap={setDisplayMap}
        />
      )}
    </div>
  );
}

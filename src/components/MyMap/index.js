import css from "./index.module.scss";
import Map, { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import { useState } from "react";
import DrawOnMap from "../DrawOnMap";

export default function MyMap() {

  const [draw, setDraw] = useState();
  const [erase, setErase] = useState();
  const [undo, setUndo] = useState();

  return (
    <div className={css.container}>

      <Map
        initialViewState={{
          longitude: 2.5,
          latitude: 48.5,
          zoom: 5,
        }}
        mapStyle="https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
      >
        <NavigationControl/>
        <ScaleControl/>
        <GeolocateControl/>
        {draw && <DrawOnMap erase={erase} setErase={setErase} undo={undo} setUndo={setUndo}/>}
      </Map>

      <button onClick={() => setDraw(!draw)}>
        Dessiner
      </button>
      <button onClick={() => setUndo(true)}>
        Retour
      </button>
      <button onClick={() => setErase(true)}>
        Effacer
      </button>

    </div>
  );
}

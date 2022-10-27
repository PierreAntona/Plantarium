import css from "./index.module.scss";
import Map, { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";

export default function MyMap() {

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
      </Map>
    </div>
  );
}

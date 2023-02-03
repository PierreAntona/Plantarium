import React from "react";
import CenterAdmin from "./centerAdmin";
import css from "./index.module.scss";
import LeftAdmin from "./LeftAdmin";

function GardenAdmin() {

  return (
    <div className={css.container}>
        <LeftAdmin />
        <CenterAdmin/>
      <div className={css.parcelleAdmin}></div>
    </div>
  );
}

export default GardenAdmin;

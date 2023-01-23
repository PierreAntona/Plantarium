import React from "react";
import css from "./index.module.scss";
import LeftAdmin from "./LeftAdmin";

function GardenAdmin() {
  return (
    <div className={css.container}>
        <LeftAdmin />
      <div className={css.garden}></div>
      <div className={css.parcelleAdmin}></div>
    </div>
  );
}

export default GardenAdmin;

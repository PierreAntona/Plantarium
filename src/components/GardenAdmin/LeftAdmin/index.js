import React from "react";
import css from "./index.module.scss";

function LeftAdmin() {
  return (
    <div className={css.container}>
      <div className={css.parcelles}>
        <div className={css.headerParcelles}>
          Parcelles
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="-0.5"
              x2="11"
              y2="-0.5"
              transform="matrix(0 -1 -1 0 5 11)"
              stroke="#322306"
            />
            <line
              y1="-0.5"
              x2="11"
              y2="-0.5"
              transform="matrix(1 0 0 -1 0 5)"
              stroke="#322306"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default LeftAdmin;

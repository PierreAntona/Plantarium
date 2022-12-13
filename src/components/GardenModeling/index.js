import css from "./index.module.scss";
import { useState, useEffect } from "react";
import Choice from "./Choice";
import SateliteView from "./SateliteView";

export default function GardenModeling() {
  const [typeOfModeling, setTypeOfModeling] = useState();

  return (
    <div className={css.container}>
      <Choice setTypeOfModeling={setTypeOfModeling} />
      { typeOfModeling === 'satelite' && <SateliteView setTypeOfModeling={setTypeOfModeling}/>}
    </div>
  );
}

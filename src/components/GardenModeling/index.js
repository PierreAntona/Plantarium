import css from "./index.module.scss";
import { useState, useEffect } from "react";
import Choice from "./Choice";

export default function GardenModeling() {
  const [typeOfModeling, setTypeOfModeling] = useState();

  useEffect(() => {
      console.log(typeOfModeling);
  }, [typeOfModeling])

  return (
    <div className={css.container}>
      <Choice typeOfModeling={typeOfModeling} setTypeOfModeling={setTypeOfModeling} />
    </div>
  );
}

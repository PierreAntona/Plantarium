import css from "./index.module.scss";
import CanvasDraw from "react-canvas-draw"

export default function DrawOnMap() {

    const canvasSettings = {
        brushRadius: 6,
        brushColor: "green",
        canvasWidth: 600,
    }

  return (
    <div className={css.container}>
      <CanvasDraw
        style={{background: "rgba(255, 255, 255, 0)"}}
        {...canvasSettings}
      />
    </div>
  );
}

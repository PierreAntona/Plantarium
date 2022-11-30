import css from "./index.module.scss";
import CanvasDraw from "react-canvas-draw";
import { useEffect, useRef } from "react";

export default function DrawOnMap({erase, setErase, undo, setUndo}) {

  let myDraw = useRef();

  const canvasSettings = {
    brushRadius: 4,
    lazyRadius: 4,
    brushColor: "green",
    canvasWidth: 600,
    gridColor: "black",
  };

  useEffect(() => {
    erase && myDraw.eraseAll();
    undo && console.log('undo');
    setErase(false);
    setUndo(false);
  }, [erase, undo])

  return (
    <div className={css.container}>
      <CanvasDraw
        style={{ background: "rgba(255, 255, 255, 0)", opacity: "0.6" }}
        {...canvasSettings}
        ref={canvasDraw => (myDraw = canvasDraw)}
      />
    </div>
  );
}

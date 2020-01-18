import React, { useRef, useEffect } from "react";
import "./Canvas.scss";

import CanvasDraw from "react-canvas-draw";

function Canvas() {
  const canvas = useRef();
  let saved;

  const save = () => {
    saved = canvas.current.getSaveData();
  };

  const load = () => {
    console.log(canvas.current.loadSaveData(saved, false));
  };

  useEffect(() => {});

  return (
    <section className="Canvas">
      <CanvasDraw
        ref={canvas}
        canvasWidth={1200}
        canvasHeight={550}
        disabled={false}
      />
      <button onClick={save}>Save</button>
      <button onClick={load}>Load</button>
    </section>
  );
}

export default Canvas;

import React, { useRef, useEffect } from "react";
import "./Canvas.scss";
import { isMobile } from "react-device-detect";
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

  if (!isMobile) {
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
  } else {
    <h1>Only Desktop is supported!</h1>;
  }
}

export default Canvas;

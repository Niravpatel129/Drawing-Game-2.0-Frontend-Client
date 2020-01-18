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
    if (saved) canvas.current.loadSaveData(saved, false);
  };

  useEffect(() => {});

  return (
    <section className="Canvas">
      {!isMobile ? (
        <div>
          <CanvasDraw
            ref={canvas}
            canvasWidth={1200}
            canvasHeight={550}
            disabled={false}
            lazyRadius={0}
            hideInterface={false}
          />
          <button onClick={save}>Save</button>
          <button onClick={load}>Load</button>
        </div>
      ) : (
        <h1>Mobile not supported</h1>
      )}
    </section>
  );
}

export default Canvas;

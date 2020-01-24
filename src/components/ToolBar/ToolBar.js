import React, { useState } from "react";
import "./ToolBar.scss";
import { useSelector, useDispatch } from "react-redux";
import { TwitterPicker } from "react-color";

function ToolBar({ canvasRef, handleMouseDown }) {
  const [cursorWidth, setWidth] = useState(
    useSelector(state => state.brushWidthReducer)
  );
  const canDraw = useSelector(state => state.canDrawReducer);
  const dispatch = useDispatch();
  const handleUndo = () => {
    canvasRef.current.undo();
    handleMouseDown();
  };

  const handleClear = () => {
    canvasRef.current.clear();
    handleMouseDown();
  };

  const handleColorChange = (color, event) => {
    console.log(color.hex);
    dispatch({ type: "SET_COLOR", payload: color.hex });
  };

  const inputChange = e => {
    setWidth(e.target.value);
    dispatch({ type: "SET_WIDTH", payload: e.target.value });
  };

  return (
    <React.Fragment>
      {canDraw && (
        <div className="ToolBar">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleUndo}>Undo</button>
          <TwitterPicker onChange={handleColorChange} />
          <input
            type="range"
            orient="vertical"
            onChange={inputChange}
            value={cursorWidth}
            min="1"
            max="15"
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default ToolBar;

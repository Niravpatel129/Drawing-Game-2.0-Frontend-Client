import React from "react";
import { TwitterPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import "./ToolBar.scss";

function ToolBar({ canvasRef, handleMouseDown }) {
  const canDraw = useSelector(state => state.canDrawReducer);
  const dispatch = useDispatch();
  const handleUndo = () => {
    canvasRef.current.undo();
    handleMouseDown();
  };

  const handleClear = () => {
    if (canvasRef) {
      canvasRef.current.clear();
    }
    handleMouseDown();
  };

  const handleColorChange = (color, event) => {
    console.log(color.hex);
    dispatch({ type: "SET_COLOR", payload: color.hex });
  };

  return (
    <React.Fragment>
      {canDraw && (
        <div className="ToolBar">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleUndo}>Undo</button>
          <TwitterPicker onChange={handleColorChange} />
        </div>
      )}
    </React.Fragment>
  );
}

export default ToolBar;

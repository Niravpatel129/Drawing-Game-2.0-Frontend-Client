import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SocketContext from "../../context";
import "./WordBlock.scss";

function WordBlock() {
  let { socket } = useContext(SocketContext);
  const [word, setWord] = useState("");
  const { room } = useSelector(state => state.contactReducer);
  const canDraw = useSelector(state => state.canDrawReducer);
  const guessedCorrect = useSelector(state => state.gussedCorrectReducer);

  useEffect(() => {
    socket.on("sendTime", res => {
      const time = res.find(i => i.roomId === room);
      if (time) setWord(time.gameData.word);
    });
  }, [socket, word, room]);

  const renderWord = () => {
    let colorPreset;
    if (guessedCorrect || canDraw) {
      colorPreset = "black";
    } else {
      colorPreset = "transparent";
    }
    return word.split("").map((i, index) => {
      //   index > 1 ? (colorPreset = "black") : (colorPreset = "transparent");
      return (
        <span style={{ color: colorPreset }} key={index}>
          <p style={{ color: colorPreset }}>{i}</p>
        </span>
      );
    });
  };

  return <div className="WordBlock">{renderWord()}</div>;
}

export default WordBlock;

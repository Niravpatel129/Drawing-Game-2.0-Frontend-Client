import React, { useContext, useState, useEffect } from "react";
import "./WordBlock.scss";
import SocketContext from "../../context";
import { useSelector } from "react-redux";

function WordBlock() {
  let { socket } = useContext(SocketContext);
  const [word, setWord] = useState("");
  const { room } = useSelector(state => state.contactReducer);

  useEffect(() => {
    socket.on("sendTime", res => {
      const time = res.find(i => i.roomId === room);
      if (time) setWord(time.gameData.word);
    });
  }, [socket, word, room]);

  const renderWord = () => {
    let colorPreset = "transparent";
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

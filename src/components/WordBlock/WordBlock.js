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
  const clock = useSelector(state => state.timeReducer);

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

    let showingWordIndex = [];
    if (clock < 60) {
      showingWordIndex.push(Math.floor(word.length / 4));
    }
    if (clock < 50) {
      showingWordIndex.push(Math.floor(word.length - 3));
    }
    if (clock < 40) {
      showingWordIndex.push(Math.floor(word.length - 2));
    }
    if (clock < 20) {
      showingWordIndex.push(Math.floor(word.length - 1));
    }
    if (clock < 10) {
      showingWordIndex.push(Math.floor(word.length));
    }

    return word.split("").map((i, index) => {
      if (i === " ") {
      }
      if (!canDraw) {
        if (guessedCorrect || showingWordIndex.indexOf(index) !== -1) {
          colorPreset = "Black";
        } else {
          colorPreset = "Transparent";
        }
      }

      return (
        <span style={{ color: colorPreset }} key={index}>
          <p
            style={{
              color: colorPreset,
              borderBottom: i === " " ? "none" : "5px solid black"
            }}
          >
            {i}
          </p>
        </span>
      );
    });
  };

  return <div className="WordBlock">{renderWord()}</div>;
}

export default WordBlock;

import { combineReducers } from "redux";

const contactReducer = (state = { name: "Guest", room: 1 }, action) => {
  // Do somethin
  switch (action.type) {
    case "SET_INFO":
      return action.payload;
    default:
      return state;
  }
};

const userInfoReducer = (state = {}, action) => {
  // Do somethin
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload;
    default:
      return state;
  }
};

const notificationDisplayReducer = (state = false, action) => {
  // Do somethin
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};

const notificationMessageReducer = (state = "", action) => {
  // Do somethin
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};

const SpinnerReducer = (
  currentSpinnerMode = { showing: false, message: "Connecting..." },
  action
) => {
  if (action.type === "TOGGLE_LOADING_SPINNER") {
    return action.payload;
  }
  return currentSpinnerMode;
};

const canDrawReducer = (canDraw = false, action) => {
  if (action.type === "SET_DRAW") {
    return action.payload;
  }
  return canDraw;
};

const ColorReducer = (color = "#444", action) => {
  if (action.type === "SET_COLOR") {
    return action.payload;
  }
  return color;
};

const brushWidthReducer = (state = 6, action) => {
  if (action.type === "SET_WIDTH") {
    return action.payload;
  }
  return state;
};

const gussedCorrectReducer = (color = false, action) => {
  if (action.type === "SET_GUESS") {
    return action.payload;
  }
  return color;
};

const gameInProgressReducer = (state = false, action) => {
  if (action.type === "SET_STATUS") {
    return action.payload;
  }

  return state;
};

const timeReducer = (state = 0, action) => {
  if (action.type === "SET_TIME") {
    return action.payload;
  }

  return state;
};

export default combineReducers({
  contactReducer,
  userInfoReducer,
  notificationDisplayReducer,
  notificationMessageReducer,
  SpinnerReducer,
  canDrawReducer,
  ColorReducer,
  gussedCorrectReducer,
  brushWidthReducer,
  gameInProgressReducer,
  timeReducer
});

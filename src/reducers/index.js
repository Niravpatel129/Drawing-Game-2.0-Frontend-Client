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

export default combineReducers({
  contactReducer,
  userInfoReducer,
  notificationDisplayReducer,
  notificationMessageReducer
});

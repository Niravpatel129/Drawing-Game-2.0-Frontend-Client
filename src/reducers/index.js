import { combineReducers } from "redux";

const contactReducer = (state = [], action) => {
  // Do somethin
  switch (action.type) {
    case "SET_INFO":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  contactReducer
});

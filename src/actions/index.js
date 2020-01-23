export const SetInfo = user => {
  return {
    type: "SET_INFO",
    payload: user
  };
};

export const UserInfo = user => {
  return {
    type: "LOGIN_USER",
    payload: user
  };
};

export const SetNotification = val => {
  return {
    type: "SET_NOTIFICATION",
    payload: val
  };
};

export const SetMessage = val => {
  return {
    type: "SET_MESSAGE",
    payload: val
  };
};

export const setLoadingSpinner = toggleOption => {
  return {
    type: "TOGGLE_LOADING_SPINNER",
    payload: toggleOption
  };
};

export const canDrawAction = action => {
  return {
    type: "SET_DRAW",
    payload: action
  };
};

export const setColorAction = action => {
  return {
    type: "SET_COLOR",
    payload: action
  };
};

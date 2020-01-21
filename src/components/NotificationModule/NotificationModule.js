import React, { useEffect, useState } from "react";
import "./NotificationModule.scss";
import { useSelector, useDispatch } from "react-redux";
function NotificationModule() {
  const [showStatus, setShowing] = useState(false);
  const visibleStatus = useSelector(state => state.notificationDisplayReducer);
  const Message = useSelector(state => state.notificationMessageReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowing(visibleStatus);
    const timeout = setTimeout(() => {
      dispatch({ type: "SET_NOTIFICATION", payload: false });
      console.log("HIDE");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, visibleStatus]);

  const visiblity = showStatus ? "block" : "none";

  return (
    <div className="NotificationModule" style={{ display: visiblity }}>
      <div className="inside">
        <h1>{Message || "No Message"}</h1>
      </div>
    </div>
  );
}

export default NotificationModule;

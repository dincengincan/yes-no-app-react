import React from "react";

function Notification(props) {
  const { showNotification, notificationMessage } = props;
  return (
    <div>
      {showNotification && (
        <h3 className="notification">{notificationMessage}</h3>
      )}
    </div>
  );
}

export default Notification;

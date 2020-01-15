import React, { useEffect } from "react";
import Notification from "./Notification";
import Spinner from "../Spinner/Spinner";

const Notifications = props => {
  useEffect(() => {
    props.fetchNotifications();
  }, []);

  let display;
  if (props.fetchingNoti) {
    display = <Spinner />;
  } else if (props.notifications.length === 0) {
    display = <p className="notifications__no">No Notifications!</p>;
  } else {
    display = props.notifications.map((notification, i) => (
      <Notification key={i} notification={notification} />
    ));
  }

  return (
    <section className="notifications">
      <h2 className="section-heading">Notifications</h2>
      {display}
    </section>
  );
};

export default Notifications;

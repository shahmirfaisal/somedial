import React, { useContext } from "react";
import NotiContext from "../../Context/NotiContext";
import { withRouter } from "react-router-dom";

const Notification = props => {
  let { pic, name, postId, status } = props.notification;
  let context = useContext(NotiContext);

  const seePost = () => {
    context.seePost(postId);
    props.history.push("/post");
  };

  return (
    <div className="notification" onClick={seePost}>
      <img src={pic} alt="Profile pic" className="notification__img" />
      <h5 className="notification__name">{name}</h5>
      <p className="notification__text"> {status} your post.</p>
    </div>
  );
};

export default withRouter(Notification);

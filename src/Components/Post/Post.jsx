import React, { useContext, PureComponent, Component } from "react";
import PostContext from "../../Context/PostContext";
import { withRouter } from "react-router-dom";


const Post = props => {

  const context = useContext(PostContext);

  let iconClass = "fas fa-heart post__icon ";
  iconClass += props.post.likes.includes(context.email) ? "liked" : "not-liked";

  const openProfile = () => {
    props.history.push("/profile");
    context.fetchProfileData(props.post.email);
  };

  return (
    <section className="post">
      <header className="post__header">
        <img
          src={props.post.pic}
          alt="User Pic"
          className="post__img"
          onClick={openProfile}
        />
        <h3 className="post__username" onClick={openProfile}>
          {props.post.name}
        </h3>
      </header>
      <p className="post__text">{props.post.text}</p>
      <footer className="post__footer">
       
          <i
            className={iconClass}
            onClick={() => {
              context.toggleLike(props.post);
              
            }}
          ></i>
  
        <p className="post__likes">{props.post.likes.length} likes</p>
      </footer>
    </section>
  );
};

export default withRouter(Post);

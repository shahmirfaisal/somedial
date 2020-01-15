import React from "react";
import Post from "../Post/Post";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import LazyLoad from "react-lazyload";

const Home = props => {
  let skeleton = (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  );

  let display;

  if (props.globalPosts === null) {
    display = skeleton;
  } else if (props.globalPosts.length === 0) {
    display = (
      <p className="error-message">
        Something went wrong.Please check your internet connection or reload
        this page
      </p>
    );
  } else {
    display = props.globalPosts.map((post, i) => (
      <LazyLoad key={i} placeholder={<PostSkeleton />} once={true}>
        <Post key={i} post={post} />
      </LazyLoad>
    ));
  }

  return (
    <section className="home">
      <h2 className="section-heading">Explore</h2>
      {display}
    </section>
  );
};

export default Home;

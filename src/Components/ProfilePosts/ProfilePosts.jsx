import React, { useContext } from "react";
import ProfileContext from "../../Context/ProfileContext";
import Post from "../Post/Post";

const ProfilePosts = () => {
  const context = useContext(ProfileContext);

  return (
    <section className="profile__posts">
      <h2 className="section-heading">Posts</h2>
      {context.profilePosts.length === 0 ? (
        <p className="profile__no-post">No Posts</p>
      ) : (
        context.profilePosts.map((post, i) => <Post key={i} post={post} />)
      )}
    </section>
  );
};

export default ProfilePosts;

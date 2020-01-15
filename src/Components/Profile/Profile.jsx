import React, { Component } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ProfilePosts from "../ProfilePosts/ProfilePosts";
import Spinner from "../Spinner/Spinner";

class Profile extends Component {
  render() {
    let display;

    if (this.props.fetchingProfile) {
      display = <Spinner />;
    } else {
      display = (
        <>
          <ProfileInfo />
          <ProfilePosts />
        </>
      );
    }

    return <section className="profile">{display}</section>;
  }
}

export default Profile;

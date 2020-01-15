import React, { useContext, useState } from "react";
import ProfileContext from "../../Context/ProfileContext";
import Firestore from "../../Firebase/Firestore";
import Spinner from "../Spinner/Spinner";
import Backdrop from "../Backdrop/Backdrop";
import ChangeBio from "../ChangeBio/ChangeBio";

const ProfileInfo = () => {
  let context = useContext(ProfileContext);
  let {
    pic: profilePic,
    name,
    address,
    bio: profileBio,
    email
  } = context.profileData;

  let [pic, changePic] = useState(profilePic);
  let [spinner, changeSpinner] = useState(false);
  let [showBio, changeShowBio] = useState(false);
  let [bio, changeProfileBio] = useState(profileBio);

  let permission = context.currentEmail === email;

  let classes = "profile__img ";
  classes += permission ? "caption" : "";

  let fig = permission ? (
    <figcaption>
      <label htmlFor="file"> Change Pic </label>
    </figcaption>
  ) : null;

  const inputChange = e => {
    changeSpinner(true);

    Firestore.changeProfilePic(
      e.target.files[0],
      email,
      context.globalPosts
    ).then(url => {
      changePic(url);
      changeSpinner(false);
    });
  };

  const showChangeBio = () => {
    changeShowBio(true);
  };
  const closeChangeBio = () => {
    changeShowBio(false);
  };

  const changeBio = bio => {
    changeShowBio(false);
    changeSpinner(true);

    Firestore.changeBio(bio, email)
      .then(() => {
        changeSpinner(false);
        changeProfileBio(bio);
      })
      .catch(er => {
        console.log(er);
      });
  };

  return (
    <section className="profile__info">
      <figure>
        <label htmlFor={permission ? "file" : ""}>
          <img src={pic} alt="" className={classes} />
        </label>
        {fig}
      </figure>
      <input id="file" type="file" onChange={inputChange} accept="image/*" />

      <h3 className="profile__name">{name}</h3>

      <div className="profile__address">
        <i className="fas fa-map-marker-alt"></i>
        <p>{address}</p>
      </div>

      <div className="profile__bio">
        <h4>BIO: </h4>
        <p>{bio || "No Bio"}</p>
      </div>

      {permission ? (
        <p className="profile__bio-change" onClick={showChangeBio}>
          Change BIO
        </p>
      ) : null}

      {spinner ? (
        <>
          <Spinner />
          <Backdrop />
        </>
      ) : null}

      {showBio ? (
        <>
          <ChangeBio close={closeChangeBio} changeBio={changeBio} />
          <Backdrop close={closeChangeBio} />
        </>
      ) : null}
    </section>
  );
};

export default ProfileInfo;

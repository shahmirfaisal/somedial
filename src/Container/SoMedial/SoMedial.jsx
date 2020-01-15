import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import SignUp from "../../Components/SignUp/SignUp";
import Login from "../../Components/Login/Login";
import { Route, withRouter } from "react-router-dom";
import "../../Firebase/Firebase.js";
import Auth from "../../Firebase/Auth";
import Home from "../../Components/Home/Home";
import Profile from "../../Components/Profile/Profile";
import ProfileContext from "../../Context/ProfileContext";
import Backdrop from "../../Components/Backdrop/Backdrop";
import Firestore from "../../Firebase/Firestore";
import UploadPost from "../../Components/UploadPost/UploadPost";
import NavContext from "../../Context/NavContext";
import Spinner from "../../Components/Spinner/Spinner";
import PostContext from "../../Context/PostContext";
import Notifications from "../../Components/Notifications/Notifications";
import Post from "../../Components/Post/Post";
import NotiContext from "../../Context/NotiContext";
import Alert from "../../Components/Alert/Alert";

class SoMedial extends Component {
  state = {
    myProfile: { name: "", email: "", pic: "" },
    globalPosts: null,

    showUploadPost: false,
    defaultPic:
      "https://firebasestorage.googleapis.com/v0/b/somedial-3f51d.appspot.com/o/pics%2Fempty-profile.png?alt=media&token=d5fa73bc-6aa2-48da-ac4b-b187efce68fa",
    isLogin: false,
    checkingLogin: true,
    showSpinner: false,
    profileData: {},
    profilePosts: null,
    fetchingProfile: true,

    notifications: null,

    fetchingNoti: true,

    notificationPost: null,

    showAlert: false,
    alertMessage: ""
  };

  componentDidMount() {
    // Fetching Global Posts
    Firestore.fetchGlobalPosts()
      .then(posts => {
        this.setState({ globalPosts: posts });
      })
      .catch(er => {
        console.log(er);
      });

    // Checking if user is loged in or not
    Auth.isLogin()
      .then(({ name, email, pic }) => {
        let myProfile = { name, email, pic };
        this.setState({ myProfile, isLogin: true, checkingLogin: false });
        this.props.history.push("/home");
      })
      .catch(() => {
        this.props.history.push("/signup");
        this.setState({ isLogin: false, checkingLogin: false });
      });
  }

  showUploadPost = () => {
    this.setState({ showUploadPost: true });
  };

  closeUploadPost = () => {
    this.setState({ showUploadPost: false });
  };

  signUp = (name, email, password, address) => {
    return new Promise((resolve, reject) => {
      Auth.signUp(name, email, password, this.state.defaultPic)
        .then(() => {
          let myProfile = { name, email, pic: this.state.defaultPic };

          Firestore.createProfile(
            this.state.defaultPic,
            name,
            address,
            null,
            email
          )
            .then(() => {
              this.setState({
                myProfile,
                isLogin: true,
                showAlert: true,
                alertMessage: "Signed up successfully!"
              });
              this.removeAlert();
              resolve();
              this.props.history.push("/home");
            })
            .catch(() => {});
        })
        .catch(er => {
          reject(er);
        });
    });
  };

  login = (email, password) => {
    return new Promise((resolve, reject) => {
      Auth.login(email, password)
        .then(({ name, pic }) => {
          let myProfile = { name, email, pic };

          this.setState({
            myProfile,
            isLogin: true,
            showAlert: true,
            alertMessage: "Loged in successfully!"
          });
          this.removeAlert();
          resolve();
          this.props.history.push("/home");
        })
        .catch(er => {
          reject(er);
        });
    });
  };

  signOut = () => {
    Auth.signOut()
      .then(() => {
        this.setState({
          isLogin: false,
          showAlert: true,
          alertMessage: "Signed Out!"
        });
        this.removeAlert();
        this.props.history.push("/signup");
      })
      .catch(er => {
        console.log(er);
      });
  };

  uploadPost = text => {
    this.setState({ showSpinner: true, showUploadPost: false });

    Firestore.uploadPost(
      this.state.myProfile.email,
      this.state.myProfile.pic,
      this.state.myProfile.name,
      text
    )
      .then(post => {
        let globalPosts = [...this.state.globalPosts];
        globalPosts.unshift(post);

        this.setState({
          globalPosts,
          showSpinner: false,
          showAlert: true,
          alertMessage: "Post Uploaded!"
        });
        this.removeAlert();

        if (
          this.props.location.pathname === "/profile" &&
          this.state.myProfile.email === this.state.profileData.email
        ) {
          let profilePosts = [...this.state.profilePosts];
          profilePosts.unshift(post);
          this.setState({ profilePosts });
        }
      })
      .catch(er => {
        this.setState({ showSpinner: false });
        console.log(er);
      });
  };

  toggleLike = post => {
    let globalPosts = [...this.state.globalPosts];
    let index = globalPosts.indexOf(post);
    let email = this.state.myProfile.email;

    let status;

    if (post.likes.includes(email)) {
      let index = post.likes.indexOf(email);
      post.likes.splice(index, 1);

      status = "unlikes";
    } else {
      post.likes.push(email);

      status = "likes";
    }

    globalPosts[index] = post;
    this.setState({ globalPosts });

    let notification = {
      pic: this.state.myProfile.pic,
      name: this.state.myProfile.name,
      postId: post.id,
      status
    };

    let sent = true;
    if (this.state.myProfile.email === post.email) {
      sent = false;
    }

    Firestore.toggleLike(post, notification, post.email, sent);
  };

  fetchProfileData = email => {
    this.setState({ fetchingProfile: true });
    Firestore.fetchProfileData(email)
      .then(profileData => {
        let globalPosts = [...this.state.globalPosts];
        let profilePosts = globalPosts.filter(post => post.email === email);
        this.setState({ profileData, profilePosts, fetchingProfile: false });
      })
      .catch(er => {});
  };

  fetchNotifications = () => {
    this.setState({ fetchingNoti: true });

    Firestore.fetchNotifications(this.state.myProfile.email).then(
      notifications => {
        this.setState({ notifications, fetchingNoti: false });
      }
    );
  };

  seePost = id => {
    let globalPosts = [...this.state.globalPosts];
    let post = globalPosts.filter(v => v.id === id);
    this.setState({ notificationPost: post[0] });
  };

  removeAlert() {
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 4000);
  }

  render() {
    return (
      <div>
        {this.state.checkingLogin ? (
          <Spinner />
        ) : (
          <>
            <NavContext.Provider
              value={{
                showUploadPost: this.showUploadPost,
                closeUploadPost: this.closeUploadPost,
                email: this.state.myProfile.email,
                fetchProfileData: this.fetchProfileData
              }}
            >
              <Header signOut={this.signOut} isLogin={this.state.isLogin} />

              {this.state.showUploadPost ? (
                <>
                  <UploadPost uploadPost={this.uploadPost} />
                  <Backdrop close={this.closeUploadPost} />
                </>
              ) : null}
            </NavContext.Provider>
            <Route
              path="/signup"
              component={() => <SignUp signUp={this.signUp} />}
            />
            <Route
              path="/login"
              component={() => <Login login={this.login} />}
            />
            <PostContext.Provider
              value={{
                email: this.state.myProfile.email,
                toggleLike: this.toggleLike,
                fetchProfileData: this.fetchProfileData
              }}
            >
              <Route
                path="/post"
                render={() => (
                  <div style={{ padding: "0 1.5rem" }}>
                    <Post post={this.state.notificationPost} />
                  </div>
                )}
              />
              <Route
                path="/home"
                component={() => <Home globalPosts={this.state.globalPosts} />}
              />
              <ProfileContext.Provider
                value={{
                  profilePosts: this.state.profilePosts,
                  profileData: this.state.profileData,
                  currentEmail: this.state.myProfile.email,
                  globalPosts: this.state.globalPosts
                }}
              >
                <Route
                  path="/profile"
                  component={() => (
                    <Profile fetchingProfile={this.state.fetchingProfile} />
                  )}
                />
              </ProfileContext.Provider>
            </PostContext.Provider>

            <NotiContext.Provider value={{ seePost: this.seePost }}>
              <Route
                path="/notifications"
                render={() => (
                  <Notifications
                    notifications={this.state.notifications}
                    fetchNotifications={this.fetchNotifications}
                    fetchingNoti={this.state.fetchingNoti}
                  />
                )}
              />
            </NotiContext.Provider>

            {this.state.showAlert ? (
              <Alert message={this.state.alertMessage} />
            ) : null}

            {this.state.showSpinner ? (
              <>
                <Spinner />
                <Backdrop />
              </>
            ) : null}
          </>
        )}
      </div>
    );
  }
}

export default withRouter(SoMedial);

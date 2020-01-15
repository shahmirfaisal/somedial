import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

class Firestore {
  constructor() {
    this.fire = firebase.firestore();
  }

  createProfile(pic, name, address, bio, email) {
    let profile = {
      pic,
      name,
      email,
      address,
      bio
    };

    return new Promise((resolve, reject) => {
      this.fire
        .collection(`${email}profile`)
        .doc("profile")
        .set(profile)
        .then(res => {
          resolve();
        })
        .catch(er => {
          console.log(er);

          reject();
        });
    });
  }

  uploadPost(email, pic, name, text) {
    let post = {
      email,
      pic,
      name,
      text,
      likes: []
    };

    return new Promise((resolve, reject) => {
      this.fire
        .collection("globalPosts")
        .add(post)
        .then(snapShot => {
          post.id = snapShot.id;
          resolve(post);
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  fetchGlobalPosts() {
    return new Promise((resolve, reject) => {
      this.fire
        .collection("globalPosts")
        .get()
        .then(docs => {
          let docsArray = [];
          docs.forEach(doc => {
            let data = { ...doc.data(), id: doc.id };
            docsArray.push(data);
          });

          resolve(docsArray);
        })
        .catch(er => {
          console.log(er);
          reject(er);
        });
    });
  }

  fetchProfileData(email) {
    return new Promise((resolve, reject) => {
      this.fire
        .collection(`${email}profile`)
        .doc("profile")
        .get()
        .then(doc => {
          resolve(doc.data());
        })
        .catch(er => {
          console.log(er);
          reject(er);
        });
    });
  }

  toggleLike(post, notification, email, sent) {
    let batch = this.fire.batch();

    let like = this.fire.collection("globalPosts").doc(post.id);
    batch.update(like, { likes: post.likes });

    let noti = this.fire.collection(`${email}notifications`).doc();
    if (sent) {
      batch.set(noti, notification);
    }

    batch
      .commit()
      .then(() => {})
      .catch(er => {
        console.log("Like and Notification", er);
      });
  }

  getPic(pic) {
    return new Promise((resolve, reject) => {
      firebase
        .storage()
        .ref(`pics/${pic.name}`)
        .getDownloadURL()
        .then(url => {
          resolve(url);
        })
        .catch(er => reject(er));
    });
  }

  updatePosts(posts) {
    return new Promise((resolve, reject) => {
      let batch = this.fire.batch();

      posts.forEach(post => {
        let doc = this.fire.collection("globalPosts").doc(post.id);
        batch.update(doc, { pic: post.pic });
      });

      batch
        .commit()
        .then(() => {
          resolve();
        })
        .catch(er => reject(er));
    });
  }

  changeProfilePic(pic, email, posts) {
    let myPosts = posts.filter(v => v.email === email);

    return new Promise((resolve, reject) => {
      firebase
        .storage()
        .ref(`pics/${pic.name}`)
        .put(pic)
        .then(() => {
          this.getPic(pic).then(url => {
            this.fire
              .collection(`${email}profile`)
              .doc("profile")
              .update({ pic: url })
              .then(() => {
                firebase
                  .auth()
                  .currentUser.updateProfile({ photoURL: url })
                  .then(() => {
                    for (let i in myPosts) {
                      myPosts[i].pic = url;
                    }

                    this.updatePosts(myPosts)
                      .then(() => resolve(url))
                      .catch(er => reject(er));
                  })
                  .catch(er => reject(er));
              });
          });
        })
        .catch(er => {
          console.log(er);
          reject();
        });
    });
  }

  changeBio(bio, email) {
    return new Promise((resolve, reject) => {
      this.fire
        .collection(`${email}profile`)
        .doc("profile")
        .update({ bio })
        .then(() => {
          resolve();
        })
        .catch(er => {
          reject(er);
        });
    });
  }

  fetchNotifications(email) {
    return new Promise((resolve, reject) => {
      this.fire
        .collection(`${email}notifications`)
        .get()
        .then(docs => {
          let arr = [];

          docs.forEach(doc => {
            arr.push(doc.data());
          });

          resolve(arr);
        });
    });
  }
}

export default new Firestore();

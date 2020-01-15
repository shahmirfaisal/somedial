import firebase from "firebase";
import "firebase/auth";

class Auth {
  constructor() {
    this.auth = firebase.auth();
  }

  signUp(name, email, password, pic) {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.auth.onAuthStateChanged(function(user) {
            user.updateProfile({
              displayName: name,
              photoURL: pic
            });

            resolve();
          });
        })
        .catch(er => {
          console.log(er);
          reject(er.message);
        });
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.auth.onAuthStateChanged(function(user) {
            if (user) {
              resolve({ name: user.displayName, pic: user.photoURL });
            }
          });
        })
        .catch(er => {
          reject(er.message);
        });
    });
  }

  isLogin() {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          resolve({
            name: user.displayName,
            email: user.email,
            pic: user.photoURL
          });
        } else {
          reject();
        }
      });
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      this.auth
        .signOut()
        .then(() => {
          resolve();
        })
        .catch(er => {
          reject(er);
        });
    });
  }
}

export default new Auth();

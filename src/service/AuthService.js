import { getApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import {initialize} from '../config/firebase.config';
import { doc, setDoc, getFirestore } from "firebase/firestore";

/* if(getApps().length === 0){
  initialize();
} */

class AuthService {

  constructor(firebaseApp) {
    this.auth = getAuth(firebaseApp);
    this.invalid = false;
  }

  waitForUser(callback) {
    return onAuthStateChanged(this.auth, (userCred) => {
      callback(userCred);
    });
  }

  handleSignUp = async (event, errorFunction) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const auth = getAuth();
    const db = getFirestore(getApp);

    var actionCodeSettings = {
      url: 'http://localhost:3000/'
    };

    createUserWithEmailAndPassword(auth, data.email, data.password).then(() => {
      sendEmailVerification(auth.currentUser, actionCodeSettings).then(() => {
        // Email verification sent!
        // ...
        setDoc(doc(db, "users", auth.currentUser.uid), {
          department: event.target.department.value,
          email: event.tarjet.email.value,
          lastname: event.target.lastName.value,
          name: event.target.firstName.value,
          admin: false,
          title: event.target.jobTitle.value,
        })
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // sendEmailVerification(auth.currentUser)
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorFunction();
            // ..
          });

      })
    }
      
    ).catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
      errorFunction();
    });

    

    
  };

  handleSignIn = async (event, errorFunction, successFunction) => {
    event.preventDefault();

    const data = {
        email: event.target.email.value,
        password: event.target.password.value,
      };

    const auth = getAuth();
      signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        successFunction();
        return user;
        // ...
      })
      .catch((e) => {
        const errorMessage = e.message;
        errorFunction();

      
      })
};

handlePasswordForgot = async(event, errorFunction, successFunction) =>{
  event.preventDefault();
  const auth = getAuth();
  var actionCodeSettings = {
    url: 'http://localhost:3000/'
  };
  sendPasswordResetEmail(auth, event.target.email.value, actionCodeSettings)
  .then(() => {
    // Password reset email sent!
    // ..
    successFunction();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    error = true;
    // console.log("there was an error!")
    errorFunction();
    // ..
  });
}

  handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
}

export default new AuthService(getApp());

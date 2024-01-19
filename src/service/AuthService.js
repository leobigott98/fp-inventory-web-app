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
import { doc, setDoc, getFirestore, Timestamp } from "firebase/firestore";

 if(getApps().length === 0){
  console.log('initializing in auth')
  initialize();
} 

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

    console.log(auth)

    var actionCodeSettings = {
      url: 'https://fp-inventory-web-app.vercel.app/'
    };

    createUserWithEmailAndPassword(auth, data.email, data.password).then(() => {
      sendEmailVerification(auth.currentUser, actionCodeSettings).then(() => {
        // Email verification sent!
        // ...
        setDoc(doc(db, "users", auth.currentUser.uid), {
          //department: event.target.department.value,
          email: event.target.email.value,
          lastname: event.target.lastName.value,
          name: event.target.firstName.value,
          role: 'viewer',
          active: true,
          date_created: Timestamp.now()
          //title: event.target.jobTitle.value,
        })
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // sendEmailVerification(auth.currentUser)
            // ...
          })
          .catch((error) => {
            console.log(error.Message)
            errorFunction();
            // ..
          });

      })
    }
      
    ).catch((error) =>{
      console.log(error.message)
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
    url: 'https://fp-inventory-web-app.vercel.app/'
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

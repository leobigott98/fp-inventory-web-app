import React from "react";
import useAuth from "./auth";
import { useRouter } from "next/router";
import AuthService from "../service/AuthService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth();
    const router = useRouter();
    const invalid = AuthService.invalid;

    if (auth.user && auth.user.emailVerified) {
      router.replace("/");
      return (
        // <Backdrop
        //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //   open={true}
        // //   onClick={handleClose}
        // >
        //   <CircularProgress color="inherit" />
        // </Backdrop>

        <h1>Loading...</h1>
      );

      
    }

    else if(auth.user && !auth.user.emailVerified){
        router.replace("/pending-verification");
        return (
          // <Backdrop
          //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          //   open={true}
          // //   onClick={handleClose}
          // >
          //   <CircularProgress color="inherit" />
          // </Backdrop>
  
          <h1>Loading...</h1>
        );
  
    }

    return <Component auth={auth} invalid={invalid} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.user) {
      router.replace("/login");
      return (
        // <Backdrop
        //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //   open={true}
        // //   onClick={handleClose}
        // >
        //   <CircularProgress color="inherit" />
        // </Backdrop>

        <h1>Loading...</h1>
      );
    }

    else if(!AuthService.auth.currentUser.emailVerified) {
      console.log(auth.user.emailVerified)
      router.replace("/pending-verification");
      return (
        // <Backdrop
        //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //   open={true}
        // //   onClick={handleClose}
        // >
        //   <CircularProgress color="inherit" />
        // </Backdrop>

        <h1>Loading...</h1>
      );

    }


    return <Component auth={auth} {...props} />;
  };
}

export function notVerified(Component) {
  return function notVerified(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.user) {
      router.replace("/login");
      return (
        // <Backdrop
        //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //   open={true}
        // //   onClick={handleClose}
        // >
        //   <CircularProgress color="inherit" />
        // </Backdrop>

        <h1>Loading...</h1>
      );
    }
    else if(AuthService.auth.currentUser.emailVerified) {
      router.replace("/");
      return (
        // <Backdrop
        //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //   open={true}
        // //   onClick={handleClose}
        // >
        //   <CircularProgress color="inherit" />
        // </Backdrop>

        <h1>Loading...</h1>
      );

    }

    return <Component auth={auth} {...props} />;
  };
}



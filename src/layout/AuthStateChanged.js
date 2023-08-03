import React, {useEffect, useState} from 'react';
import AuthService from "../service/AuthService"
import UseAuth from '../hook/auth';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function AuthStateChanged({children}){
    const {setUser} = UseAuth()
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        AuthService.waitForUser((userCred) =>{
            setUser(userCred);
            setLoading(false);
        });
    },[]);
        

    if(loading){
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

    return children;
}
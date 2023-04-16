import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 



const SigninPage = () => {

    const provider = new firebase.auth.GoogleAuthProvider();

    try{
        let resp = firebase.auth().signInWithPopup(provider)
    }catch(err){
        console.log(err);
    }

    const signInWithGoogle = () => {
        try{
            let resp = firebase.auth().signInWithPopup(provider)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="signin_button" onClick={signInWithGoogle}>Sign in with Google</div>
    )
}

export default SigninPage
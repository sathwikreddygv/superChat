import logo from './logo.svg';
import {React, useEffect} from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore'
import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SigninPage from './SigninPage';
import SuperChat from './SuperChat';

firebase.initializeApp({
  apiKey: "AIzaSyBHijenljXSsHl3PbIx9MW_pG6x3JEBbVA",
  authDomain: "superchat-5c6b0.firebaseapp.com",
  projectId: "superchat-5c6b0",
  storageBucket: "superchat-5c6b0.appspot.com",
  messagingSenderId: "601026107683",
  appId: "1:601026107683:web:359f8a18106af2e4335496",
  measurementId: "G-B1B7D88LZF"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {

  const [user, loading, error] = useAuthState(auth)

  return (
    <div className="App">
    {
      user?<SuperChat auth = {auth} firestore={firestore} user = {user}/>:<SigninPage/>
    }
    </div>
  );
}

export default App;

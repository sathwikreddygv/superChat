import { React, useState, useEffect, useRef } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore';

const SuperChat = ({auth, firestore, user}) => {
    const myCollection = firestore.collection('myCollection');
    const query = myCollection.orderBy('createdAt');
    const [messages,loadingMessages,error] = useCollectionData(query);
    const [new_msg, set_new_msg] = useState('');
    const myRef = useRef()

    const send_message = async() => {
        if(new_msg){
            try{
                const {uid, photoURL} = auth.currentUser
                let resp = await myCollection.add({message: new_msg, createdAt: firebase.firestore.FieldValue.serverTimestamp(), uid, photoURL})
                set_new_msg('')
            }catch(err){
                console.log(err);
            }
        }
    }

    const signout = async() => {
        try{
            let resp = await firebase.auth().signOut()
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        console.log('msgs', auth.currentUser.photoURL);
        let t = myRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);

    return(
        <>
            <div style={{margin:'10vh 5vh', padding:'10px 20px', backgroundColor:'rgba(32,33,35)', color:'white', overflow:'auto', height:'75vh', borderRadius:'16px'}}>
            {
                messages && messages.length ? messages.map((single_msg, idx) => (
                    <div key={idx} ref={idx==messages.length-1 ? myRef : null} className="flex_property" style={{justifyContent: single_msg.uid === auth.currentUser.uid ? 'flex-end' : 'flex-start', margin: '10px 0px'}}>
                    {
                        single_msg.uid === auth.currentUser.uid ?
                        <>
                            <div>{single_msg.message}</div>
                            <img src={single_msg.photoURL} width='30px' height='30px' style={{marginLeft:'10px'}}/>
                        </>:
                        <>
                           <img src={single_msg.photoURL} width='30px' height='30px' style={{marginRight:'10px'}}/>
                           <div>{single_msg.message}</div>
                        </>
                    }
                        
                    </div>
                )) : 'Be the first one to start the conversation'
            }
                <div className="flex_center" style={{margin:'20px 0px'}}>
                    <input className="msg_input" type='text' placeholder="Type..." value={new_msg} onChange={(e) => set_new_msg(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter'){send_message()}}}/>
                    <div className="send_button" onClick={send_message}>Send</div>
                </div>
            </div>
            <div className="signout_button" onClick={signout}>Sign Out</div>
        </>
    )
}

export default SuperChat
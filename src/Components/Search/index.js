import React, { useContext, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import './index.css'
import { db } from '../../Config/firebase';
import { AuthContext } from '../../context/AuthContext';

const Search = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = e => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists or not ,if not create new
    // const combinedId = currentUser.uid > user.uid
    //   ? currentUser.uid + user.uid
    //   : user.uid + currentUser.uid
    // try {
    //   console.log(user,'mils')
    //   const res = await getDoc(doc, "chats", combinedId)
    //   if (!res.exists()) {
    //     //create a chat in chats collection 
    //     await setDoc(doc(db, "chats", combinedId), { messages: [] })
    //     // create user chats 
    //     await updateDoc(doc(db, "userChats", currentUser.uid), {
    //       [combinedId + ". userInfo"]: {
    //         uid: user.uid,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL,
    //       },
    //       [combinedId+".date"]:serverTimestamp()
    //     })
    //     await updateDoc(doc(db, "userChats", user.uid), {
    //       [combinedId + ". userInfo"]: {
    //         uid: currentUser.uid,
    //         displayName: currentUser.displayName,
    //         photoURL: currentUser.photoURL,
    //       },
    //       [combinedId+".date"]:serverTimestamp()
    //     })
    //   }
    // } catch (err) {

    // }
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("")
  }
  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          onKeyDown={handleKey}
          onChange={e => setUserName(e.target.value)}
          placeholder='Find a user'
          value={userName}
          style={{
            backgroundColor: 'transparent', border: 'none', color: 'white',
            outline: 'none',
          }} type='text' />
      </div>
      {err && <span>user not found </span>}
      {user && <div className='userChat' onClick={handleSelect}>
        <img
          src={user.photoURL}
          alt=''
          style={{ height: "40px", width: '40px', borderRadius: '50%', objectFit: 'cover' }} />
        <div className='userChatInfo'>
          <span>{user.displayName} </span>
        </div>
      </div>}
    </div>
  )
}

export default Search
import React, { useState } from 'react'
import './index.css'
import Add from '../../assets/avatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth ,db,storage} from '../../Config/firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate ,Link} from 'react-router-dom'


const Register = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);
            
            const uploadTask = uploadBytesResumable(storageRef, file);
            
         
            uploadTask.on(
             
              (error) => {
                // Handle unsuccessful uploads
                setErr(true)
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                  await updateProfile(res.user,{
                    displayName,
                    photoURL:downloadURL,
                  })
                  // Add a new document in collection "cities"
                  await setDoc(doc(db, "users", res.user.uid), {
                     displayName,
                     email,
                     photoURL:downloadURL,
                     uid : res.user.uid,
                    });
                    await setDoc(doc(db,"userChats",res.user.uid),{})
                    navigate('/')
                });
              }
            );

        } catch (err) {
            setErr(true)
        }

    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>
                    Chat
                </span>
                <span className='title'>
                    Register
                </span>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input className='input' type={'text'} placeholder="display name" />
                    <input className='input' type={'email'} placeholder="Email" />
                    <input className='input' type={'password'} placeholder="Password" />
                    <input className='input' style={{ display: 'none' }} type={'file'} id='file' />
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: 'gray', cursor: 'pointer ' }}
                        htmlFor='file'>
                        <img style={{ height: '40px', width: '40px' }} src={Add} />
                        <span>
                            Add an avatar
                        </span>
                    </label>
                    <button className='signUp'> Sign Up</button>
                    {err && <span>something went Wrong</span>}
                </form>
                <p className='text'>You do have an account? <Link to='/login'>Login</Link></p>
            </div>

        </div>
    )
}

export default Register;

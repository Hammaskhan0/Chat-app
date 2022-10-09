import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../../Config/firebase'
import { AuthContext } from '../../context/AuthContext'
import './index.css'

const Navbar = () => {
 const {currentUser} =useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo2'> Chat App</span>
      <div className='user'>
        <img style={{backgroundColor:'#ddddf7',
        height:"24px",borderRadius:'50%',
        width:'24px',objectFit:'cover'}}
        src={currentUser.photoURL} 
        alt=''/>
        <span>{currentUser.displayName}</span>
        <button
        onClick={()=> signOut(auth)}
        style={{
          backgroundColor:'#5d5b8d',
          color:'#ddddf7',
          fontSize:'12px',
          border:'none',
          height:'30px',
          cursor:'pointer'
        }}>
          logout
        </button>
      </div>
    </div>
  )
}

export default Navbar

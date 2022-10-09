import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import './index.css'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log(message, "message")
  return (
    <div className='message' >
      <div className='messageInfo'>
        <img style={{
          width: "40px",
          height: '40px',
          borderRadius: "50%",
          objectFit: 'cover'
        }} src={message.senderId === currentUser.uid
          ? currentUser.photoURL :
          data.user.photoURL} />
        <span>Just now</span>
      </div>
      <div className='messageContent'>
      {message.senderId === currentUser.uid
          ? <p className='p'>{message.text}</p> :
          <p className='p2'>{message.text}</p> } 
        {message.img && <img style={{
          width: "50%",
        }} src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message

import React, { useContext } from 'react'
import './index.css'
import { AiOutlineUserAdd,} from 'react-icons/ai';
import {MdMoreHoriz} from 'react-icons/md'
import {BsCameraVideoFill} from 'react-icons/bs'
import Messages from '../Messages';
import Input from '../Input'
import { ChatContext } from '../../context/ChatContext';

const Chat = () => {

  const { data } = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
        <BsCameraVideoFill cursor={'pointer'} style={{paddingRight:'10px'}} size={27} color='white' />
        <AiOutlineUserAdd cursor={'pointer'}style={{paddingRight:'10px'}}  size={26} color='white'/>
       < MdMoreHoriz cursor={'pointer'}style={{paddingRight:'10px'}}  size={27} color='white'/>
        </div>
      </div>
        <Messages/>
        <Input/>
      </div>
  )
}

export default Chat

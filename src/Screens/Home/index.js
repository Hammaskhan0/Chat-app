import React from 'react'
import Chat from '../../Components/Chat'
import SideBar from '../../Components/Sidebar'
import './index.css'

const Home = () => {
    return (
        <div className='home'>
            <div className='container'>
                <SideBar />
                <Chat />
            </div>
        </div>
    )
}

export default Home

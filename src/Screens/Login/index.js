import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { auth } from '../../Config/firebase'
// import './index.css'
// import Add from '../../assets/avatar.png'

const Login = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate ()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
       await signInWithEmailAndPassword(auth,email,password)
       navigate('/')

        }catch (err) {
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
                    Login
                </span>
                <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'15px'}}>
                    {/* <input className='input' type={'text'} placeholder="display name" />  */}
                    <input className='input'  type={'email'} placeholder="Email" />
                    <input className='input'  type={'password'} placeholder="Password" />
                    {/* <input className='input' hidden={true} type={'file'} id='file' />
                    <label style={{display:'flex',alignItems:'center',fontSize:'12px',color:'gray',cursor:'pointer '}} htmlFor='file'> 
                    <img style={{height:'40px',width:'40px'}} src={Add}/>
                    <span>
                        Add an avatar
                    </span>
                    </label> */}
                    <button className='signUp'> Sign In</button>
                    {err && <span>something went Wrong</span>}
                </form>
      <p className='text'>You don't have an account? <Link to='/register'>Register</Link></p>
            </div>

        </div>
    )
}

export default Login

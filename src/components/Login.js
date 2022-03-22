import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import "../styles/Login.css"
import { auth } from "../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setUser} from '../redux/user';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

    const signIn = (e) => {
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      const user = userCredential.user;
      dispatch(setUser({id: user.uid, email: user.email}))
      navigate("/todo")
    })
    .catch((error) => {
      console.error({errorCode : error.code, errorMessage : error.message})
    });

    }

  return (
    <main className='login'>
        <h3 className='login__logo'>Welcome! </h3>
        <form className='login__form'> 
          <label htmlFor='email'> Email address   </label>
          <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor='password'> Password  </label>
          <input type="password" value={password} required onChange={(e)=> setPassword(e.target.value)}/>
          <button className='login__btn' onClick={signIn} type="submit">Log in</button>
        </form>
        <Link to="/signup">Proceed to Sign up</Link>
    </main>
  )
}

export default Login
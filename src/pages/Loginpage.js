import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Usercontext } from '../Context/Usercontext'
import axios from 'axios'
import env from '../env'



function Loginpage() {

  const navigate = useNavigate()
  const [error, seterror] = useState("")
  const {setcurrentstate}=useContext(Usercontext)

  const [userdata, setuserdata] = useState({
    email: "",
    password: ""
  })


  const changehandler = (e) => {
    setuserdata(prevstate => {
      return {...prevstate, [e.target.name]:e.target.value}
    })
  }

  const handlelogin = async (e) => {
  try {
    e.preventDefault()
    seterror("")
    const res = await axios.post(`${env.USER_API_URL}/login`, userdata)
    const user = res.data
    setcurrentstate(user)
    navigate('/')
  } catch (error) {
    seterror(error?.response?.data?.message)
    console.log(error)
  }
}



  return (
   <div className='register'>
      <div className='container'>
        <form className='register_form' onSubmit={handlelogin}>
        <h2>Sign In</h2>
          {error && <p className='register_errorform'>{error}</p>}
          <input type='email' placeholder='Email address' value={userdata.email} onChange={changehandler} name='email' autoFocus/>
          <input type='password' placeholder='password' value={userdata.password} onChange={changehandler} name='password'autoFocus/>
          <button className='register_btn'>Signup</button>
          <small>Don't have an account? <span><Link to={'/register'}>Sign up</Link></span></small>
        </form>
      </div>
    </div>  
  )
}

export default Loginpage

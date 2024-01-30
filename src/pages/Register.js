import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import env from '../env'
import toast from 'react-hot-toast'


function Register() {

  const navigate = useNavigate()
  const[error,seterror]=useState("")

  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: ""
  })


  const changehandler = (e) => {
    setuserdata(prevstate => {
      return {...prevstate, [e.target.name]:e.target.value}
    })
  }

  const handleregister = async (e) => {
   
    try {
      e.preventDefault()
      seterror("")
      const res = await axios.post(`${env.USER_API_URL}/register`, userdata)
      
      if (res.status === 200) {
        navigate('/login')
      }
      const data = res.data
      if (!data) {
        seterror("Couldn't register user. please try again")
      }
      
    } catch (error) {
      seterror(error.response.data.message)
    }
  }




  return (
    <div className='register'>
      <div className='container'>
        <form className='register_form' onSubmit={handleregister}>
        <h2>Sign up</h2>
          {error && <p className='register_errorform'>{error}</p>}
          <input type='text' placeholder='Full name' value={userdata.name} onChange={changehandler} name='name' autoFocus/>
          <input type='email' placeholder='Email address' value={userdata.email} onChange={changehandler} name='email' autoFocus/>
          <input type='password' placeholder='password' value={userdata.password} onChange={changehandler} name='password'autoFocus/>
          <button className='register_btn'>Signup</button>
          <small>Already have an account? <span><Link to={'/login'}>Sign in</Link></span></small>
        </form>
      </div>
    </div>
  )
}

export default Register

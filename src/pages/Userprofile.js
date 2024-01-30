import React, { useContext, useEffect, useState } from 'react'
import { dummypost } from '../Data'
import avatar1 from "../images/avatar6.webp"
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Usercontext } from '../Context/Usercontext';
import axios from 'axios';
import env from '../env';



function Userprofile() {
  const [avatar, setavatar] = useState("")
  const [name, setname] = useState("")
  const [email,setemail]=useState("")
  const [currentpassword,setcurrentpassword]=useState("")
  const [newpassword, setnewpassword] = useState("")
  const [confirmnewpassword, setconfirmnewpassword] = useState("") 


  const { currentstate } = useContext(Usercontext)
  const navigate=useNavigate()
  const token = currentstate?.token
  
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])
  


  useEffect(() => {
    const getuser = async () => {
      const res = await axios.get(`${env.USER_API_URL}/${currentstate.id}`)
      setname(res.data.name)
      setemail(res.data.email)
    }
    getuser()
  },[])





  return (
    <div className='profile'>
      <div className='profile_container'>
        <Link to={`/myposts/${currentstate.id}`} className='profile_btn'>My posts</Link>

        <div className='profile_details'>
          <div className='avatar_wrapper'>
            <div className='profile_avatar'>
              <img src={avatar1} />
            </div>
            
            <form className='avatar'>
              <input name='avatar' id='avatar' type='file' accept='png,jpg,jpeg' onChange={(e)=>setavatar(e.target.files[0])}/>
              <label htmlFor='avatar' ><FaEdit/></label>
            </form>
            {/* <button className='profile_avatar_btn'><FaCheckCircle/></button> */}
          </div>
          
          <h1 className='profile_name'>{currentstate.name}</h1>
        </div>


      </div>

      <div className='profile_form'>
        <input type='name' placeholder='Enter your name' onChange={(e)=>setname(e.target.value)} value={name}/>
        <input type='email' placeholder='Enter your email'onChange={(e)=>setemail(e.target.value)} value={email}/>
        <input type='password' placeholder='Current Password'onChange={(e)=>setcurrentpassword(e.target.value)}/>
        <input type='password' placeholder='New Password'onChange={(e)=>setnewpassword(e.target.value)}/>
        <input type='password' placeholder='Comfirm New Password' onChange={(e)=>setconfirmnewpassword(e.target.value)}/>
        <button className='profile_form_btn'>Update the details</button>
      </div>
      </div>
  )
}

export default Userprofile

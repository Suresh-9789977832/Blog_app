import React, { useContext, useEffect } from 'react'
import Post from '../Components/Post'
import { useNavigate } from 'react-router-dom'
import { Usercontext } from '../Context/Usercontext'





const Home = () => {

  const { currentstate } = useContext(Usercontext)
const navigate=useNavigate()
const token = currentstate?.token

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])
  

  
  return (
    <div>
      <Post/>
    </div>
  )
}

export default Home

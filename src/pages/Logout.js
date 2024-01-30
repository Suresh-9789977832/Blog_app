import React from 'react'
import { useContext,useEffect } from 'react'
import { Usercontext } from '../Context/Usercontext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

  const {setcurrentstate} = useContext(Usercontext)
  const navigate = useNavigate();

  setcurrentstate(null)
  navigate('/register')

  return (
    <>
    </>
  )
}

export default Logout

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from  '../images/avatar3.webp'
import axios from 'axios'
import env from '../env'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


function Postauthor({ createdAt, authorid }) {
  const[author,setauthor]=useState({})
  
  useEffect(() => {
    const getauthor = async () => {
      try {
        let res = await axios.get(`${env.USER_API_URL}/${authorid}`)
        setauthor(res?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getauthor()
  },[])
  return (
    <Link to={`/posts/users/${authorid}`}  className='post_author'>
          <div className='post_author_avatar'>
              <img src={avatar} />
          </div>
          <div className='post_author_details'>
        <h5>{author.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-Us'/> </small>
          </div>
    </Link>
  )
}

export default Postauthor

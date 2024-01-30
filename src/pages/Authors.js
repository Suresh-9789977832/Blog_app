import React, { useEffect, useState } from 'react'
import avatar1 from '../images/avatar3.webp'
import avatar2 from '../images/avatar4.jpg'
import avatar3 from '../images/avatar5.jpeg'
import avatar4 from '../images/avatar6.webp'
import avatar5 from '../images/avatar7.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import env from '../env'
import Loader from '../Components/Loader'



function Authors() {

  const [author, setauthor] = useState([])
  const [isloading, setisloading] = useState(false)
  
  useEffect(() => {
    const getauthor = async () => {
      try {
          setisloading(true)
          const res = await axios.get(`${env.USER_API_URL}`)
          setauthor(res.data)
        } catch (error) {
          console.log(error)
      }
      setisloading(false)
    }
    getauthor()
  }, [])
  
  if (isloading) {
    return <Loader/>
  }
 
  return (
    <div className='authors'>
      {author.length>0?<div className='authors_container'>
        {
          author.map(({_id,name,posts}) => {
            return <Link key={_id} to={`/posts/users/${_id}`} className='author'>
              <div className='author_avatar'>
                <img src={''} alt={`Image of ${name}`} />
              </div>
              <div className='author_info'>
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div>:<h2 className='center'>No users/authors found.</h2>}
    </div>
  )
}

export default Authors

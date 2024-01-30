import React, { useContext, useEffect, useState } from 'react'
import Postauthor from '../Components/Postauthor'
import { Link, useParams } from 'react-router-dom'
import wealth from '../images/farm1.jpg'
import { Usercontext } from '../Context/Usercontext'
import axios from 'axios'
import env from '../env'
import Loader from '../Components/Loader'


function Postdetails() {
  const { id } = useParams()
  const [post, setposts] = useState(null)
  const [error,seterror]=useState(null)
  const [isloading, setisloading] = useState(false)
  
  const { currentstate } = useContext(Usercontext)


  useEffect(() => {
          const getpost = async () => {
            try {
              setisloading(true)
        const res = await axios.get(`${env.POST_API_URL}/${id}`)
        setposts(res.data)
      } catch (error) {
        console.log(error)
      }
      setisloading(false)
    }
    getpost()

  }, [])
  

  if (isloading) {
    return <Loader/>
  }


  
 

  return (
    <section className='post_detail'>
    {post  && <div className='post_detail_container'>
        <div className='post_detail_header'>
          <Postauthor authorid={post.creator} createdAt={post.createdAt}/>
          {currentstate?.id ==post?.creator &&  
            <div className='post_detail_buttons'>
              <Link to={`/posts/wewer/edit`} className='buttons'>Edit</Link>
              <Link to={`/posts/wewer/delete`} className='buttons'>Delete</Link>
            </div>
          }
        </div>
        <h1 className='post_detail_title'>{post?.title}</h1>
        <div className='post_detail_thumbnail'>
          <img src={`${env.ASSETS_API_URL}/uploads/${post?.thumbnail}`} />
        </div>
        <p>{post.description}</p>
      </div>}

    </section>
  )
}

export default Postdetails

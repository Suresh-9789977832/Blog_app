import React, { useEffect, useState } from 'react'

import Postitem from './Postitem'
import Loader from './Loader'
import axios from 'axios'
import env from '../env'



function Post() {

    const [posts, setposts] = useState([])
    const [isloading, setisloading] = useState(false)
    console.log(posts)
    
    useEffect(() => {
        const fetposts = async () => {
            setisloading(true)
            try {
                let res = await axios.get(`${env.POST_API_URL}`)
                setposts(res?.data)
            } catch (error) {
                console.log(error)
            }
            setisloading(false)
        }    
        fetposts()
    }, [])



    if (isloading) {
        return <Loader/>
    }


    return (
      
        <div className='posts'>
            {
                posts.length>0?   <div className='posts_conatiner'>
                {
                        posts.map((e, i) => <Postitem key={i} id={e._id} thumbnail={e.thumbnail} title={e.title} category={e.category}
                            desc={e.description} authorid={e.creator} createdAt={e.createdAt}
                    />)
                }
                </div> :
                    <h2 className='center'>No post founds</h2>
             
            }
    </div>
  )
}

export default Post

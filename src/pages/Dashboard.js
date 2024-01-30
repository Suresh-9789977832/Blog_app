import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Usercontext } from '../Context/Usercontext'
import axios from 'axios'
import env from '../env'
import Loader from '../Components/Loader'


function Dashboard() {

  

  const { currentstate } = useContext(Usercontext)
  const navigate=useNavigate()
  const token = currentstate?.token
  
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  },[])



  const [data, setdata] = useState([])
  const [isloading,setisloading]=useState(false)
  const params = useParams()
  const id=params.id

  useEffect(() => {
    const getalluserpost = async () => {
      setisloading(true)
      try {
        let res = await axios.get(`${env.POST_API_URL}/users/${id}`)
        setdata(res.data)
      } catch (error) {
        console.log(error)
      }
      setisloading(false)
    }
    getalluserpost()
  }, [])

  
  if (isloading) {
    return <Loader/>
  }
console.log(data)
 

  return (
    <div className='dash_main'>
      {
        data.length > 0 ?
          data.map(({title,thumbnail,_id}) => {
          return  <div className='dash_wrapper'>
          <div className='dash_right_wrapper'>
            <div className='dash_img_wrapper'>
                <img src={thumbnail} />
            </div>
              <p>{title}</p>
          </div>
          
          <div className='dash_left_wrapper'>
            <Link to={`/posts/${_id}`}><button className='green posts_btn'>View</button></Link>
            <Link to={`/posts/${_id}/edit`}><button className='blue posts_btn'>Edit</button></Link>
            <Link to={`/posts/${_id}/delete`}><button className='red posts_btn'>Delete</button></Link>
            </div>
          </div>
        })
          :
          <h2 className='center'>No post found</h2>
      }
   
      </div>
  )
}

export default Dashboard

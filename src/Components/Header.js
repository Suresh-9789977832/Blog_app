import React, { useContext, useState } from 'react'
import Blog from '../images/Blogger_icon_2017.svg.png'
import { Link } from 'react-router-dom'
import { HiXMark } from "react-icons/hi2";
import { FaBarsStaggered } from "react-icons/fa6";
import Logout from '../pages/Logout';
import { Usercontext } from '../Context/Usercontext';


function Header() {
    const [hide, sethide] = useState(false)
    const {currentstate}=useContext(Usercontext)

  return (
      <div className='main_header'>
          <div className='header_left'>
              <Link  to={'/'}>
                  <img src={Blog} className='header_logo' style={{width:"40px"}}/>
              </Link>
          </div>
            
          {
              currentstate?.id &&  <div  className={hide?"header_right_small":"header_right"}  >
                  <p><Link to={'/profile/sfsdfsdf'}>{currentstate.name}</Link></p>
              <p><Link to={'/create'}>Create post</Link></p>
              <p><Link to={'/authors'}>Authors</Link></p>
              <p><Link to={'/logout'}>Logout</Link></p>
          </div>
          } 

        {          
              !currentstate?.id &&  <div  className={hide?"header_right_small":"header_right"}  >
              <p><Link to={'/authors'}>Authors</Link></p>
              <p><Link to={'/login'}>Login</Link></p>
          </div>
          } 
          

        
          <p  className='headers_icon' onClick={()=>sethide(prev=>!prev)}>
              
              {
                  hide ? <HiXMark size={30} />
                      :
                      <FaBarsStaggered size={30} /> 
              }
          </p>

    </div>
  )
}

export default Header

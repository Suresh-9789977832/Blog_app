import React from 'react'
import { Link } from 'react-router-dom'
import Postauthor from './Postauthor'
import env from '../env'

function Postitem({ id, thumbnail, title, category, desc,authorid,createdAt }) {
  const shortdesc = desc?.length > 145 ? desc.substr(0, 145) + "..." : desc
  const shorttitle = title?.length > 30 ? title.substr(0, 30) + "..." : title

  
  return (
    <article className='post'>
          <div className='post_thumbnail'>
              <img src={`${env.ASSETS_API_URL}/uploads/${thumbnail}`} alt={title} />
          </div>
          <div className='post_content'>
              <Link to={`/posts/${id}`}>
                  <h3>{shorttitle}</h3>
              </Link>
              <p className='desc'>{shortdesc}</p>
              <div className='post_footer'>
          <Postauthor authorid={authorid} createdAt={createdAt} />
                  <Link to={`/posts/categories/${category}`} ><button className='button'>{category}</button></Link>
              </div>
          </div>
    </article>
  )
}

export default Postitem

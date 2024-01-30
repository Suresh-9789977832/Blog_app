import React from 'react'
import { Link } from 'react-router-dom'

function Errorpost() {
  return (
      <section>
          <div className='error_page'>
              <div className='center'>
                 <button className='btn'> <Link to="/" >Go Back Home</Link></button>
                  <h2 className='error'>Page Not Found</h2>
                </div>
          </div>
   </section>
  )
}

export default Errorpost

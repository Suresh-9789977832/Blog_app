import React from 'react'
import loader from '../images/loading.gif'

function Loader() {
  return (
    <div className='loader'>
          <div className='loader_image'>
                <img src={loader}/>
        </div>
    </div>
  )
}



export default Loader

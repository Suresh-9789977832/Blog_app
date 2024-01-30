import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Usercontext } from '../Context/Usercontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from '../env';


function Createpost() {
  const [title, settitle] = useState("")
  const [category, setcategory] = useState("Uncategorized")
  const [desc, setdesc] = useState("")
  const [thumbnail, setthumbnail] = useState('')
  const [error,seterror]=useState('')


  const postcategories=["Agriculture","Business","Education","Entertainment","Art","Inverstment","Uncategorized","Wealth"]


  // const modules = {
  //   toolbar: [
  //     [{ "header": [1, 2,3,4,5,6, false] }],
  //     ['bold', "italic", "underline", "strike", "blockquote"]
  //     [{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }],
  //     ['link', 'image'],
  //     ["clean"]
  //   ]
  // }

  // const formats = [
  //   "header",
  //   "bold", "italic", "underline", "strike", "blockquote",
  //   "List", "bullet", "indent",
  //   "link","image"
  // ]


  const { currentstate } = useContext(Usercontext)
  const navigate=useNavigate()
  const token = currentstate?.token
  
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  },[])


  const createnewpost = async(e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.set('title', title)
    formdata.set('category', category)
    formdata.set('description', desc)
      formdata.set('thumbnail', thumbnail)
      
    
    try {
      const res = await axios.post(`${env.POST_API_URL}`, formdata, { headers: { Authorization: `Bearer ${token}` } })
      console.log(res)

      if (res.status === 200) {
        return navigate('/')
      }

    
    } catch (error) {
      if(error?.response?.status === 400)
      seterror(error.response.data.message)
      // console.log()
    }
}

  return (
    <div className='create_post'>
      <div className='container'>
        <h2>Create Post</h2>
        {error && <p className='register_errorform'>{error}</p>}
        <form className='form create_post_form'>
          <input type='text' placeholder='Title' value={title} onChange={(e) => settitle(e.target.value)} autoFocus className='create_input'/>
          <select name='category' value={category} onChange={(e)=>setcategory(e.target.value)}>
            {
              postcategories.map((e) => {
                return <option>{e}</option>
              })
            }

          </select> 
          {/* <ReactQuill modules={modules} formats={formats} onChange={setdesc} value={desc} className='ql-editor'/> */}
          <input type='text' placeholder='Description' value={desc} onChange={(e) => setdesc(e.target.value)} autoFocus className='create_input'/>


            <input type='file' onChange={(e) => setthumbnail(e.target.files[0])} accept='png,jpg,jpeg' />
        </form>
        <button className='create_btn' onClick={createnewpost}>createpost</button>

        </div>
    </div>
  )
}

export default Createpost

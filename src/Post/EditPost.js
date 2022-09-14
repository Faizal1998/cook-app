import React from 'react'
import { useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
const EditPost = ({posts,editTitle,editBody,handleEdit,setEditTitle,setEditBody}) => {

    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id);
    useEffect(()=>{
        if(post){
        setEditTitle(post.title)
        setEditBody(post.body)
        }
    },[post,setEditTitle,setEditBody])
  return (
    <main className="NewPost">
        {editTitle &&
        <>
        <h2>EditPost</h2>
        <form className="NewPostForm" onSubmit={(e)=>e.preventDefault()}>
          <label  htmlFor="postTitle">Title</label>
          <input
            id="postTitle"
            type="text"
            required
            value={editTitle}
            onChange={(e)=>setEditTitle(e.target.value)}
            />

            <label htmlFor="postBody">Post Body</label>
            <textarea
            id="postBody"
            required
            value={editBody}
            onChange={(e)=>setEditBody(e.target.value)}
            />

            <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>


        </form>
        </>}
        {!editTitle &&
            <>
            <p>Post Not found.</p>
            <Link to="/" className='PostNotFound'><p className='PostNotFound'>please visit our homepage.</p></Link>
            </>
            }
      </main>
  )
}

export default EditPost
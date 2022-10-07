import React from 'react'
import { Link } from 'react-router-dom'
import './Post.css'

const Post = ({ post }) => {
  return (
    <>
      <article className='mainPagePost'>
        <Link to={`/post/${post.id}`}>
          <h2>{post.title}</h2>
          <p className='mainPagePostDate'>{post.datetime}</p>

        </Link>
        <p className='mainPagePostBody'><strong>{post.author ? post.author : "Anonymous"} : </strong>{
          // (post.body).length <= 50
          //   ? 
          post.body
          // : `${(post.body).slice(0, 50)}..`
        }</p>
        <hr></hr>
      </article>

    </>
  )
}

export default Post
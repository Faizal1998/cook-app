import {Link, useParams} from 'react-router-dom'
import './Post.css'
const PostPage = ({posts,handleDelete}) => {
    const { id }=useParams();
    const post=posts.find(post=>(post.id).toString()===id);
    const Body = () =>//new line implementation
          post.body.split("\n").map((value, index) => {
          return (
            <span key={index}>
              {value}
              <br />
            </span>
          )
        })
    return (
      <main className='Post'>
        <article className='Post'>
            {post && 
            <>
            <h2>{post.title}</h2>
            <p className='PostDate'>{post.datetime}</p>
            <p className='PostBody'>{Body()}</p>
            
            <div className='buttonFlex'>
            <Link to={`/edit/${post.id}`}>
              <button className='EditButton'>Edit</button>
            </Link>
            <button className='DeleteButton' onClick={()=>handleDelete(post.id)}>
              Delete
            </button>
            </div>
            </>
            }
            {!post &&
            <>
            <p>Post Not found.</p>
            <Link to="/" className='PostNotFound'><p className='PostNotFound'>please visit our homepage.</p></Link>
            </>
            }
        </article>
        
      </main>
    )
  }
  
  export default PostPage
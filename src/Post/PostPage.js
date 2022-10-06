import { Link, useParams } from 'react-router-dom'
import './Post.css'
const PostPage = ({ posts, displayName, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
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
            <p className='PostBody'><strong>{post.author ? post.author : "Anonymous"} : </strong>{Body()}</p>

            <div className='buttonFlex'>
              {(post.author === displayName || post.author == "") ?   //can add admin role to edit and delete post in future
                <>
                  <Link to={`/edit/${post.id}`}>
                    <button className='EditButton'>Edit</button>
                  </Link>
                  <button className='DeleteButton' onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
                </>
                :
                null
              }
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
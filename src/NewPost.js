import './NewPost.css'
const NewPost = ({handleSubmit,postTitle,postBody,setPostBody,setPostTitle}) => {

        
    return (
      <main className="NewPost">
        <h2>NewPost</h2>
        <form className="NewPostForm" onSubmit={handleSubmit}>
          <label  htmlFor="postTitle">Title</label>
          <input
            id="postTitle"
            type="text"
            required
            value={postTitle}
            onChange={(e)=>setPostTitle(e.target.value)}
            />

            <label htmlFor="postBody">Post Body</label>
            <textarea
            id="postBody"
            required
            value={postBody}
            onChange={(e)=>setPostBody(e.target.value)}
            />

            <button type="submit">Submit</button>


        </form>
      </main>
    )
  }
  
  export default NewPost
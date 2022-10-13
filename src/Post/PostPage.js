
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/PostPage.css';
import { format } from 'date-fns';
import database from '../API/Base';
import Edit from '../Images/editIcon.png';
import Delete from '../Images/deleteIcon.png';
import HeartLight from '../Images/heartLight.png';
import HeartRed from '../Images/heartRed.png';
import Comment from '../Images/comment.png';
import Share from '../Images/share.png';
import { ref, set } from "firebase/database";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

const PostPage = ({ posts, displayName, handleDelete }) => {
  // const [post, setPost] = useState('')
  const [addComment, setAddComment] = useState('')
  const [comment, setComment] = useState([])
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [likes, setLikes] = useState({
    likesCount: 0,
    personLiked: ''
  });
  const [likedInSession, setLikedInSession] = useState(false);
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
  useEffect(() => {
    try {

      if (post.comments) setComment(Object.values(post.comments))
      if (post.likes) setLikes(post.likes)
      console.log("post.likes.personLiked", displayName, likedInSession)
      if (post.likes.personLiked !== undefined && displayName !== '' && post.likes.personLiked.includes(displayName)) {
        setLikedInSession(true)
      }
      else {
        setLikedInSession(false)
      }
      console.log("post.likes.personLiked", likedInSession, displayName !== '' && post.likes.personLiked.includes(displayName))

    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
      }
      else {
        console.log(`Error ${err}`)
      }

    }
  }, [posts])


  //handle adding likes
  const addLikesHandler = (e, post) => {
    try {
      if (displayName !== '') {
        if (!likedInSession) {
          const likesCount = (post.likes !== undefined && post.likes.likesCount !== undefined) ? post.likes.likesCount + 1 : 1;
          const personLiked = (post.likes !== undefined && post.likes.personLiked !== undefined) ? post.likes.personLiked.concat(", ", displayName) : displayName;
          console.log('likes', likesCount, personLiked);
          set(ref(database, 'posts/' + post.id + '/likes/'), { likesCount, personLiked });
          setLikedInSession(true)
        } else {
          const likesCount = (post.likes !== undefined && post.likes.likesCount !== undefined) ? post.likes.likesCount - 1 : 1;
          const personLiked = (post.likes !== undefined && post.likes.personLiked !== undefined) ? post.likes.personLiked.replace(`, ${displayName}`, "") : "";
          set(ref(database, 'posts/' + post.id + '/likes/'), { likesCount, personLiked });
          setLikedInSession(false)
        }
      }
      else {
        setOpen(true)
        setShareMessage("Please Login to add like")
      }
    }
    catch (err) {
      console.log(`Error ${err.message}`)
    }
  }

  //handle adding comments
  const onChangeHandler = (e) => {
    setAddComment(e.target.value)
  }
  const addCommentsHandler = (e, post) => {
    try {
      if (addComment !== '') {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const commentId = comment.length === 0 ? 1 : comment[comment.length - 1].commentId + 1;
        console.log(commentId)
        // const commentId = 1
        const updatedPost = { commentId, comment: addComment, datetime, author: displayName };
        set(ref(database, 'posts/' + post.id + '/comments/' + commentId), updatedPost);
      }
    }
    catch (err) {
      console.log(`Error ${err.message}`)
    }

    reset()
  }
  function reset() {
    setAddComment('')
    document.getElementById("addComments").reset();

  }

  //handle share url ( copy url)
  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const handleShare = () => {
    let url = document.location.href

    navigator.clipboard.writeText(url).then(function () {
      console.log('Copied!');
      setShareMessage("URL copied");
    }, function () {
      console.log('Copy error');
      setShareMessage("Something went wrong")
    });
    setOpen(true);
  }
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        close
      </Button>
    </React.Fragment>
  );

  return (
    <main className='PostPage'>
      <article className='Post'>
        {post &&
          <>
            <div className='postHeader'>
              <div className='postTitle'>
                <h2>{post.title}</h2>
                <p className='PostDate'>{post.datetime}</p>
              </div>
              <div className='buttonFlex'>
                {(post.author === displayName || post.author == "" || post.author === undefined) ?   //can add admin role to edit and delete post in future
                  <>
                    <Link to={`/edit/${post.id}`}>
                      <button className='EditButton'><img src={Edit} /></button>
                    </Link>
                    <button className='DeleteButton' onClick={() => handleDelete(post.id)}>
                      <img src={Delete} />
                    </button>
                  </>
                  :
                  null
                }
              </div>
            </div>
            <p className='PostBody'><strong>{post.author ? post.author : "Anonymous"} : </strong>{Body()}</p>

            <div className='likePanel'>
              <button onClick={(e) => addLikesHandler(e, post)} ><img src={likedInSession ? HeartRed : HeartLight} />{likes.likesCount} likes</button>
              <button onClick={() => document.getElementById('addComments').scrollIntoView()}><img src={Comment} /></button>
              <button onClick={handleShare}><img src={Share} /></button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={shareMessage}
                action={action}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              />
            </div>
            <div className='comments'>
              <h3>Comments</h3>
              {post.comments ?
                <>
                  <div className='cmtView'>
                    {comment.map((cmt) => {
                      return (
                        <><div className='commentMessage'>
                          <strong>{cmt.author ? cmt.author : "Anonymous"} : </strong>
                          {cmt.comment}
                        </div><hr></hr></>)
                    })
                    }
                  </div>
                </> :
                null}
              <form id='addComments' onSubmit={(e) => e.preventDefault()}>
                {/* <label htmlFor='addComts'>Add comments</label> */}
                <input
                  id="addComts"
                  type="text"
                  placeholder="Add comments"
                  value={addComment}
                  onChange={(e) => onChangeHandler(e)}
                />
                <input
                  type="submit"
                  // value='Add'
                  onClick={(e) => addCommentsHandler(e, post)}
                />
              </form>
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
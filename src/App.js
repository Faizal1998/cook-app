
import{Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'

import PostPage from './PostPage'
import EditPost from './EditPost'
import About from './About'
import Missing from './Missing'

import { useEffect, useState } from 'react'
import {format} from'date-fns'
import api from './API/Post'
function App() {
  const[posts,setPosts]=useState([]);
  const [search,setSearch]=useState('');
 const[searchResults,setSearchResults]=useState([]);
 const [postTitle,setPostTitle]=useState('');
 const [postBody,setPostBody]=useState('');
 const [editTitle,setEditTitle]=useState('');
 const [editBody,setEditBody]=useState('');
 const [keys,setKeys]=useState([]);
 const [db,setDb]=useState([]);
 const history=useNavigate();
  useEffect(()=>{
    const fetchPosts=async()=>{
      try{
        const response=await api.get('/posts.json');
        setDb(response.data)

        //console.log(db)
        setKeys(Object.keys(response.data))
        
        if (response && response.data) setPosts(Object.values(response.data))
      }
      catch(err)
      {
        if(err.response){
          console.log(err.response.data)
        }
        else{
          console.log(`Error ${err}`)
        }
        
      }
    }
    fetchPosts();
    //console.log(keys,"key pair",db)
  },[posts])
  useEffect(()=>{
    //console.log("post",posts)
    const filteredResults=posts.filter(post=>
      
      ((post.body).toLowerCase().includes(search.toLowerCase()))
      || ((post.title).toLowerCase().includes(search.toLowerCase()))
      );
      setSearchResults(filteredResults.reverse());
  },[posts,search])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id=posts.length ? posts[posts.length-1].id+1:1;
    const datetime=format(new Date(),'MMMM dd, yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    try{
      await api.post('/posts.json',newPost)
      //console.log("submit block",response.data)
      const allPosts=[...posts,newPost];//removed response and added newPost
      
      setPosts(allPosts)
      setPostTitle('');
      setPostBody('');
      history('/');

    }
    catch(err){
      console.log(`Error ${err.message}`)
    }

  }
  
  
  const handleDelete=async(id)=>{
    try{
      keys.map((dbkey)=> {
        
        
        if(db[dbkey].id===id) {
          const del=async()=>await api.delete(`./posts/${dbkey}.json`);
          del();
        }
      return(dbkey);
      }
        
        );
      
      const postList=posts.filter((post)=>post.id!==id);
      setPosts(postList)
      history('/');

    }
    catch(err){
      console.log(`Error ${err.message}`)
    }
  }

  const handleEdit=async(id)=>{
    const datetime=format(new Date(),'MMMM dd, yyyy pp');
    console.log(editBody,editTitle)
    const updatedPost={id,title:editTitle,datetime,body:editBody};
    try{
      /* const response=await api.put(`/posts/${id}`,updatedPost) */
      keys.map((dbkey)=> {
        
        if(db[dbkey].id===id) {
          const upd=async()=>await api.put(`./posts/${dbkey}.json`,updatedPost);
          upd();
        }
      return(dbkey);
      });
      setPosts(posts.map((post)=>post.id===id?{...updatedPost}:post))
      setEditBody('');
      setEditTitle('');
      history(`/post/${id}`)
    }
    catch(err){
      console.log(`Error ${err.message}`)
    }
  }
  return (
    
  <div className='App'>
    
    <Header title={"React Blog App"}/>
    <Nav search={search} setSearch={setSearch}/>
    <Routes>
      <Route path="/" element={<Home 
      posts={searchResults}

      />}/>
      <Route path="/post" element={<NewPost
        handleSubmit={handleSubmit}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        setPostBody={setPostBody}
        postBody={postBody}
      />}/>
      <Route path="/edit/:id" element={<EditPost
        posts={posts}
        handleEdit={handleEdit}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        setEditBody={setEditBody}
        editBody={editBody}
      />}/>
      <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='*' element={<Missing/>}/>
      
    </Routes>
    <Footer />
  </div>
  )
}

export default App;

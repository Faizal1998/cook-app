import './Home.css'
import Feed from './Feed'
const Home = ({posts}) => {

        
    return (
      <main className="Home">
        
        {posts.length ? 
        (<Feed posts={posts}/>) 
        : (<p style={{marginTop:"2rem"}}>
           No post available.
          </p>)}
      </main>
    )
  }
  
  export default Home
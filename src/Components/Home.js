import './Home.css'
import Feed from '../Post/Feed'
import Loader from '../util/Loader'
const Home = ({posts}) => {

        
    return (
      <main className="Home">
        
        {posts.length ? 
        (<Feed posts={posts}/>) 
        : 
        <Loader />
        // (<p style={{marginTop:"2rem"}}>
        //    No post available.
        //   </p>)
        }
      </main>
    )
  }
  
  export default Home
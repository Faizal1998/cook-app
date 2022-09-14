import {Link } from 'react-router-dom';
import './Missing.css'
const Missing = () => {

        
    return (
      <main>
        <>
            <p>Post Not found.</p>
            <Link to="/" className='PostNotFound'><p className='PostNotFound'>please visit our homepage.</p></Link>
            </>
      </main>
    )
  }
  
  export default Missing
import React from 'react';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import CircularProgress from '@mui/material/CircularProgress';


function Loader() {
  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(() => {
    const interval = setInterval(() => refreshPage(), 50000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
    <CircularProgress >
        <span className="visually-hidden">Loading...</span>
    </CircularProgress>

    {/*<Spinner animation="border" variant="primary" role="status">
         <span className="visually-hidden">Loading...</span>
     </Spinner> */}
    </>
  );
}

export default Loader;
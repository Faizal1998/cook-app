import React from 'react'
import './NavItems.css'
import logo from './Images/2-removebg-preview.png'
import bg from './Images/briyani.jpg'
const NavItems = () => {
    const navItems=[
        {
            name:"Home",
            path:"#home"
        },
        {
            name:"News",
            path:"#news"
        },
        {
            name:"Contact",
            path:"#contact"
        },
        {
            name:"About",
            path:"#about"
        }
        
    ]
  return (
    <>
    <nav>
        
        <ul>
        
            {navItems.map((item)=>{
                return(
                <li key={item.name} ><a href={item.path}>{item.name}</a></li>
            )})}
            
             <li className='logo'><img src={logo} alt="icon"/></li>
             <li className='logoText'><a href='#home'>Cook Book</a></li>
        </ul>
        
    </nav>
    <div id='rectangleC'>
        <img className='bg' src={bg} alt="background"/>
        
        <button className='signup'>Sign Up</button>
    </div>
    </>
  )
}

export default NavItems
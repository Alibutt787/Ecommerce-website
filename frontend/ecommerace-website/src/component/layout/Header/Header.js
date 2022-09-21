import React, { useState } from 'react'
import './Header.css'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {Link} from 'react-router-dom'
const Header = () => {
 const [isMobile, setIsMobile] =useState(false);
  return (
    <nav className='headerNav'>
      <div className='headerNavLog'>
        Logo
      </div>

      <div className={isMobile? 'nav-link-mobile':'headerNavList'}>
        <ul  >
          <li><Link className='navListName' to={"/"}> Home</Link> </li>
          <li><Link className='navListName' to={"/products"}>Products</Link></li>
          <li><Link className='navListName' to={"/about"}>about</Link></li>
          <li className='SignIn'><Link className='navListName' to={"/LoginSignUp"}><span>Login</span></Link></li>
        </ul>
      </div>

     <button className='mobile-menu-icon'>
     
     {isMobile? (<AiOutlineClose onClick={()=>
      setIsMobile(false)}/>)
     :
     (<AiOutlineMenu onClick={()=>
      setIsMobile(true)}/>) 
      }
     </button>
     
    </nav>
  )
}

export default Header
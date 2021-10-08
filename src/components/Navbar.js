import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import Home from '../assets/home.png';
import user from '../assets/login.png';
import key from '../assets/key.png';
import post from '../assets/add.png';
import './styles/Navbar.css';
export default function Navbar() {
  return (
    <nav>
      <div className='nav-wrapper main'>
        <img src={Logo} className='logo' alt='logoIcon' />

        <ul id='nav-mobile' className='right'>
          {/* <li>
            <Link to='/'>
              <img src={Home} className='icon' alt='homeIcon' />
            </Link>
          </li> */}
          <li>
            <Link to='/Login'>
              <img src={key} className='icon' alt='loginIcon' />
            </Link>
          </li>
          {/* // <li>
          //   <Link to='/Signup'>Signup</Link>
          // </li> */}
          <li>
            <Link to='/Profile'>
              <img src={user} className='icon' alt='profileIcon' />
            </Link>
          </li>
          <li>
            <Link to='/Create'>
              <img src={post} className='icon' alt='postIcon' />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

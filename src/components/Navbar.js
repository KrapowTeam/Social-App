import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import Home from '../assets/home.png';
import user from '../assets/login.png';
import key from '../assets/key.png';
import post from '../assets/add.png';
import logout from '../assets/logout.png';
import './styles/Navbar.css';
import { UserContext } from '../App';

export default function Navbar() {
  const { state, dispatch } = React.useContext(UserContext);
  const history = useHistory();
  return state ? (
    <nav>
      <div className='nav-wrapper'>
        <img src={Logo} className='logo' alt='logoIcon' />

        <ul id='nav-mobile' className='right'>
          <li>
            <Link to='/'>
              <img src={Home} className='icon' alt='homeIcon' />
            </Link>
          </li>
          {/* <li>
            <Link to='/Login'>
              <img src={key} className='icon' alt='loginIcon' />
            </Link>
          </li> */}
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
          <li>
            <Link
              to='/Login'
              onClick={() => {
                localStorage.clear();
                dispatch({ type: 'CLEAR' });
              }}
            >
              <img src={logout} className='icon' alt='logout' />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  ) : null;
}

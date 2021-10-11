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
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
  const { state, dispatch } = React.useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    // let now = new Date();
    fetch('/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: state.email,
        event: 'logout',
      }),
    });
  };
  // console.log('state = ', state);
  return (
    <>
      {(state ?? '').name && (
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

              {state.email === 'phakawat.ta@ku.th' ? (
                <li>
                  <Link to='/admin'>
                    {/* <img src={admin} className='icon' alt='adminIcon' /> */}
                    <FontAwesomeIcon
                      className='icon'
                      style={{ marginTop: '24px', marginBottom: '-2px' }}
                      icon={faUser}
                      color='white'
                    />
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  to='/Login'
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: 'CLEAR' });
                    logout();
                  }}
                >
                  <FontAwesomeIcon
                    className='icon'
                    style={{
                      marginTop: '21px',
                      marginBottom: '-3px',
                    }}
                    icon={faSignOutAlt}
                    color='white'
                  />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

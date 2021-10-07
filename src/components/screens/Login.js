import React from 'react';
import '../styles/Login.css';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

function move() {
  console.clear();
  const loginBtn = document.getElementById('login');
  const signupBtn = document.getElementById('signup');
  loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
      if (element !== 'slide-up') {
        parent.classList.add('slide-up');
      } else {
        signupBtn.parentNode.classList.add('slide-up');
        parent.classList.remove('slide-up');
      }
    });
  });
  signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
      if (element !== 'slide-up') {
        parent.classList.add('slide-up');
      } else {
        loginBtn.parentNode.parentNode.classList.add('slide-up');
        parent.classList.remove('slide-up');
      }
    });
  });
}
export default function Login() {
  const history = useHistory();
  const [nameRegis, setNameRegis] = React.useState('');
  const [passwordRegis, setPasswordRegis] = React.useState('');
  const [emailRegis, setEmailRegis] = React.useState('');
  const [confirmRegis, setConfirmRegis] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [noticePass, setNoticePass] = React.useState(false);
  const getLogin = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: 'Invalid email format',
        classes: '#c62828 red darken-3',
      });
      return;
    }
    fetch('/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          console.log(data);
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          // history.push('./login');
        }
      });
  };
  const getRegis = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        emailRegis
      )
    ) {
      M.toast({
        html: 'Invalid email format',
        classes: '#c62828 red darken-3',
      });
      return;
    }
    if (passwordRegis.length < 8 || passwordRegis.length > 16) {
      M.toast({
        html: 'Password must be 8-16 characters',
        classes: '#c62828 red darken-3',
      });
      return;
    }
    if (passwordRegis !== confirmRegis && confirmRegis) {
      M.toast({
        html: 'Password not matched',
        classes: '#c62828 red darken-3',
      });
      return;
    }
  };
  return (
    <div className='form-structor'>
      <div className='signup slide-up'>
        <h2 className='form-title' id='signup' onClick={(e) => move()}>
          <span>OR</span>Sign up
        </h2>
        <div className='form-holder'>
          <input
            type='text'
            className='input'
            placeholder='Name'
            value={nameRegis}
            onChange={(e) => setNameRegis(e.target.value)}
          />
          <input
            type='email'
            className='input'
            placeholder='Email'
            value={emailRegis}
            onChange={(e) => setEmailRegis(e.target.value)}
          />
          <input
            type='password'
            className='input'
            placeholder='Password'
            value={passwordRegis}
            onChange={(e) => {
              setPasswordRegis(e.target.value);
            }}
            onMouseEnter={(e) => setNoticePass(true)}
            onMouseLeave={(e) => setNoticePass(false)}
          />
          {noticePass ? (
            <span className='popuptext'>
              At least 8 characters, must contain at least one lower-case
              letter, one upper-case letter, one digit and a special character
            </span>
          ) : null}
          {/* {console.log(noticePass)} */}
          <input
            type='password'
            className='input'
            placeholder='Confirm Password'
            value={confirmRegis}
            onChange={(e) => {
              setConfirmRegis(e.target.value);
            }}
          />
        </div>
        <button
          className={
            emailRegis && nameRegis && passwordRegis && confirmRegis
              ? 'submit-btn'
              : 'submit-btn-disable'
          }
          disabled={
            !emailRegis && !nameRegis && !passwordRegis && !confirmRegis
          }
          onClick={() => getRegis()}
        >
          Sign up
        </button>
      </div>

      <div className='login'>
        <div className='center'>
          <h2 className='form-title' id='login' onClick={(e) => move()}>
            <span>OR</span>Log in
          </h2>
          <div className='form-holder'>
            <input
              type='email'
              className='input'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='submit-btn' onClick={() => getLogin()}>
            Log in
          </button>
          <div className='line'>
            <h3>
              <span>OR</span>
            </h3>
          </div>
          <div className='forgot'>
            <h2>Forgot password?</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

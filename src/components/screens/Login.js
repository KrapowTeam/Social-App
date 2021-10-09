import React, { useContext } from 'react';
import { UserContext } from '../../App';
import '../styles/Login.css';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import validator from 'validator';

function move() {
  console.clear();
  const loginBtn = document.getElementById('login');
  const signupBtn = document.getElementById('signup');
  loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
      if (element !== 'slideUp') {
        parent.classList.add('slideUp');
      } else {
        signupBtn.parentNode.classList.add('slideUp');
        parent.classList.remove('slideUp');
      }
    });
  });
  signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
      if (element !== 'slideUp') {
        parent.classList.add('slideUp');
      } else {
        loginBtn.parentNode.parentNode.classList.add('slideUp');
        parent.classList.remove('slideUp');
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
  const [notice, setNotice] = React.useState(false);
  const { state, dispatch } = React.useContext(UserContext);
  const GetLogin = (e) => {
    e.preventDefault();
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
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          history.push('/');
        }
      });
    // .catch((e) => {
    //   M.toast({
    //     html: 'Incorrect',
    //     classes: '#c62828 red darken-3',
    //   });
    // });
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
    if (passwordRegis.length < 8 || passwordRegis.length > 19) {
      M.toast({
        html: 'Password must be 8-19 characters',
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
    if (
      !validator.isStrongPassword(passwordRegis, {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      M.toast({
        html: 'Password must contain at least one lower-case letter, one upper-case letter, one digit and a special character',
        classes: '#c62828 red darken-3',
      });
      return;
    }
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRegis.toLowerCase(),
        email: emailRegis,
        password: passwordRegis,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          console.log(data);
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
        }
      });
  };
  return (
    <>
      <div className='formStructor'>
        <div className='signup slideUp'>
          <h2 className='formTitle' id='signup' onClick={(e) => move()}>
            <span>OR</span>Sign up
          </h2>
          <form>
            <div className='formHolder'>
              <input
                type='text'
                className='input'
                placeholder='Name'
                value={nameRegis}
                onChange={(e) => setNameRegis(e.target.value)}
              />
              <input
                type='text'
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
                onMouseEnter={(e) => setNotice(true)}
                onMouseLeave={(e) => setNotice(false)}
              />
              {notice ? (
                <span className='popuptext'>
                  At least 8-19 characters, must contain at least one lower-case
                  letter, one upper-case letter, one digit and a special
                  character
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
                  ? 'submitBtn'
                  : 'submitBtnDisable'
              }
              disabled={
                !emailRegis && !nameRegis && !passwordRegis && !confirmRegis
              }
              onClick={() => getRegis()}
            >
              Sign up
            </button>
          </form>
        </div>

        <div className='login'>
          <div className='center'>
            <h2 className='formTitle' id='login' onClick={(e) => move()}>
              <span>OR</span>Log in
            </h2>
            <form>
              <div className='formHolder'>
                <input
                  type='text'
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
              <button
                type='submit'
                className='submitBtn'
                onClick={(e) => {
                  GetLogin(e);
                  setPassword('');
                }}
              >
                Log in
              </button>
            </form>
            <div className='line'>
              <h3>
                <span>OR</span>
              </h3>
            </div>
            <div href='/forgotin' className='forgot'>
              <h2>Forgot password?</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

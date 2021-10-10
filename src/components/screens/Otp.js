import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import '../styles/Login.css';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import validator from 'validator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <div></div>
    // <div className='formStructor'>
    //   <div className='login'>
    //     <div className='center'>
    //       <h2 className='formTitle' id='login'>
    //         OTP
    //       </h2>
    //       <form>
    //         <div className='formHolder'>
    //           <input
    //             type='text'
    //             className='input'
    //             placeholder='OTP'
    //             value={email}
    //             onChange={() => {}}
    //           />
    //         </div>
    //         <button type='submit' className='submitBtn' onClick={() => {}}>
    //           Confirm OTP
    //         </button>
    //       </form>
    //       <div className='line'></div>
    //         <h3>
    //           <span>OR</span>
    //         </h3>
    //       </div>
    //       <div className='forgot'>
    //         <a href='/forgotpassword'>Forgot password?</a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

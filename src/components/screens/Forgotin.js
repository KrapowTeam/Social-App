import React, { useState } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';
const Forgotin = (props) => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const handleSubmit = (e) => {
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
    fetch('/forgotpassword', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === 'Email not found') {
          M.toast({
            html: 'Email not founded Please check your email',
            classes: '#c62828 red darken-3',
          });
        } else {
          M.toast({
            html: 'Complete reset!.Please check in your email',
            classes: '#c62828 green darken-3',
          });
          history.push('/login');
        }
      });
  };

  return (
    <div>
      <div />
      <form>
        <input
          type='text'
          // className={styles.input}
          placeholder='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type='submit' onClick={handleSubmit}>
          send
        </button>
      </form>
    </div>
  );
};
export default Forgotin;

import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import styles from '../styles/Forgot.module.css';
import { withRouter } from 'react-router-dom';
function Forgot(props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const expDate = useRef('');
  const history = useHistory();
  useEffect(() => {
    console.log(props.location.pathname.split('/forgot/'));
    expDate.current =
      props.location.pathname.split('/forgot')[
        props.location.pathname.split('/forgot').length - 1
      ];
    console.log('expDate = ', expDate);
  }, []);

  const handleSubmit = () => {
    //  validate here
    console.log('check = ', {
      password,
      expirePasswordDate: expDate.current,
    });
    if (password === confirmPassword) {
      fetch('/setPassword', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          expirePasswordDate: expDate.current.replace('/', ''),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data = ', data);
        });
    }
  };
  return (
    <div>
      <div />
      <input
        type='password'
        // className={styles.input}
        placeholder='password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type='password'
        // className={styles.input}
        placeholder='confirmPassword'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={() => handleSubmit()}>click</button>
    </div>
  );
}
export default withRouter(Forgot);

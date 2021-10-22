import React, { useEffect, useState, useContext } from 'react';
import '../styles/Profile.css';
import { faHeart, faCog, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../App';

export default function Profile() {
  const [mypics, setPics] = useState([]);

  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('/myposts', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.mypost);
        setPics(result.mypost);
      });
  }, []);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'insta-clone');
      data.append('cloud_name', 'cnq');
      fetch('https://api.cloudinary.com/v1_1/cnq/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch('/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                'user',
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: 'UPDATEPIC', payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <>
      {state ? (
        <div className='all'>
          <div className='container'>
            <div className='profile'>
              <div className='profile-image'>
                <img className='pimg' src={state.pic} alt='profileIMG' />
              </div>

              <div className='profile-user-settings'>
                <h1 className='profile-user-name'>{state.name}</h1>

                <button className='btnp profile-edit-btnp'>Edit Profile</button>

                <button
                  className='btnp profile-settings-btnp'
                  aria-label='profile settings'
                >
                  <FontAwesomeIcon
                    icon={faCog}
                    aria-hidden='true'
                  ></FontAwesomeIcon>
                </button>
              </div>

              <div className='profile-stats'>
                <ul>
                  <li>
                    <span className='profile-stat-count'>{mypics.length} </span>{' '}
                    posts
                  </li>
                  <li>
                    <span className='profile-stat-count'>
                      {state ? state.followers.length : '0'}
                    </span>{' '}
                    followers
                  </li>
                  <li>
                    <span className='profile-stat-count'>
                      {state ? state.following.length : '0'}
                    </span>{' '}
                    following
                  </li>
                </ul>
              </div>

              <div className='profile-bio'>
                <p>
                  <span className='profile-real-name'>Stonk Man</span> I am
                  Investor
                </p>
              </div>
              {/* <div
                className='file-field input-field'
                style={{ margin: '10px' }}
              >
                <div className='btn #64b5f6 blue darken-1'>
                  <span>Upload pic</span>
                  <input
                    type='file'
                    onChange={(e) => updatePhoto(e.target.files[0])}
                  />
                </div>
                <div className='file-path-wrapper'>
                  <input className='file-path valiadate' type='text' />
                </div>
              </div> */}
            </div>
          </div>
          <div className='container'>
            <div className='gallery'>
              {mypics.map((item) => (
                <div className='gallery-item' tabindex='0'>
                  <img
                    className='pimg'
                    key={item._id}
                    src={item.photo}
                    className='gallery-image'
                    alt={item.title}
                  />

                  <div className='gallery-item-info'>
                    <ul>
                      <li className='gallery-item-likes'>
                        <span className='visually-hidden'>Likes:</span>
                        <FontAwesomeIcon
                          icon={faHeart}
                          aria-hidden='true'
                        ></FontAwesomeIcon>{' '}
                        1
                      </li>
                      <li className='gallery-item-comments'>
                        <span className='visually-hidden'>Comments:</span>
                        <FontAwesomeIcon
                          icon={faComment}
                          aria-hidden='true'
                        ></FontAwesomeIcon>{' '}
                        2
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='loader'></div>
      )}
    </>
  );
}

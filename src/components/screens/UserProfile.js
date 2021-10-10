import React, { useEffect, useState, useContext } from 'react';
import '../styles/Profile.css';
import { faHeart, faCog, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(userid);
        setProfile(result);
      })
      .catch((e) => {
        console.log('error ', e);
      });
  }, []);

  return (
    <>
      {userProfile ? (
        <div className='all'>
          <div className='container'>
            <div className='profile'>
              <div className='profile-image'>
                <img
                  className='pimg'
                  src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
                  alt=''
                />
              </div>

              <div className='profile-user-settings'>
                <h1 className='profile-user-name'>{userProfile.user.name}</h1>

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
                    <span className='profile-stat-count'>
                      {userProfile.posts.length}{' '}
                    </span>
                    posts
                  </li>
                  <li>
                    <span className='profile-stat-count'>188</span> followers
                  </li>
                  <li>
                    <span className='profile-stat-count'>206</span> following
                  </li>
                </ul>
              </div>

              <div className='profile-bio'>
                <p>
                  <span className='profile-real-name'>Stonk Man</span> I am
                  Investor
                </p>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='gallery'>
              {userProfile.posts.map((item) => (
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

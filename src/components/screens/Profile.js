import React from 'react';
import '../styles/Profile.css';
import { faHeart, faCog, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const posts = [
  {
    picture:
      'https://i.pinimg.com/originals/b8/4b/fe/b84bfeb8bae7626de264f259fd4e7c4c.jpg',
    like: 56,
    comment: 2,
  },
  {
    picture: 'https://cdn.kapwing.com/video_image-5nBqxYZRz.jpg',
    like: 1011,
    comment: 81,
  },
  {
    picture:
      'https://i.pinimg.com/736x/4f/38/18/4f38183f63037430ea022c730c88b5fc.jpg',
    like: 92,
    comment: 30,
  },
];
export default function Profile() {
  return (
    <>
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
              <h1 className='profile-user-name'>stonk_</h1>

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
                  <span className='profile-stat-count'>164</span> posts
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
            {posts.map((post) => (
              <div className='gallery-item' tabindex='0'>
                <img
                  className='pimg'
                  src={post.picture}
                  className='gallery-image'
                  alt=''
                />

                <div className='gallery-item-info'>
                  <ul>
                    <li className='gallery-item-likes'>
                      <span className='visually-hidden'>Likes:</span>
                      <FontAwesomeIcon
                        icon={faHeart}
                        aria-hidden='true'
                      ></FontAwesomeIcon>{' '}
                      {post.like}
                    </li>
                    <li className='gallery-item-comments'>
                      <span className='visually-hidden'>Comments:</span>
                      <FontAwesomeIcon
                        icon={faComment}
                        aria-hidden='true'
                      ></FontAwesomeIcon>{' '}
                      {post.comment}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div class='loader'></div>
        </div>
      </div>
    </>
  );
}

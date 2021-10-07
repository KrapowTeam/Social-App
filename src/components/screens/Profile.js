import React from 'react';
import '../styles/Profile.css';
export default function Profile() {
  return (
    <div className='profile'>
      <div className='profileDetail'>
        <div className='profileBox'>
          <div>
            <img
              alt='profileImg'
              className='profileImg'
              src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
            ></img>
          </div>
          <div className='myDetails'>
            <h4>Stonk Man</h4>
            <h5>stonk@meme.com</h5>
            <div className='socialDetails'>
              <h6>40 posts</h6>
              <h6>40 followers</h6>
              <h6>40 following</h6>
            </div>
          </div>
        </div>
        <div className='profileGallery'>
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
          <img
            className='galleryImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
        </div>
      </div>
    </div>
  );
}

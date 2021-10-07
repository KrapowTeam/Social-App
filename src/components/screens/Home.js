import React from 'react';
import '../styles/Home.css';
import Love from '../../assets/heart.png';
import LoveFilled from '../../assets/heart1.png';
export default function Home() {
  const [like, setLike] = React.useState(false);
  return (
    <div className='home'>
      <div className='card home-card'>
        <h5>Stonk</h5>
        <div className='card-image'>
          <img
            alt='postImg'
            src='https://static.wikia.nocookie.net/adf25491-c481-48c6-bec5-0586ba019662'
          />
        </div>
        <div className='card-content'>
          <div onClick={() => setLike(!like)}>
            {!like ? (
              <img src={Love} className='likeIcon' alt='likeIconUnfilled' />
            ) : (
              <img src={LoveFilled} className='likeIcon' alt='likeIconFilled' />
            )}
          </div>

          <h6>title</h6>
          <p>this is amazing post</p>
          <input type='text' placeholder='Add some comment' />
        </div>
      </div>
    </div>
  );
}

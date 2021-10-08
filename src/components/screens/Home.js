import React from 'react';
import '../styles/Home.css';
import Love from '../../assets/heart.png';
import LoveFilled from '../../assets/heart1.png';
export default function Home() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('/allpost', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.posts);
        setData(res.posts);
      });
  }, []);
  return (
    <div className='home'>
      {data.map((item) => {
        console.log('photo', item.photo);
        console.log('photo', item.title);
        console.log('photo', item.body);
        console.log('photo', item.postedBy);
      })}
      {data.map((item) => {
        return (
          <>
            <div className='card home-card'>
              <div className='card-image'>
                <img alt='postImg' src={item.photo} />
              </div>
              <div className='card-content'>
                <div>
                  <img src={Love} className='likeIcon' alt='likeIconUnfilled' />
                </div>
                <h6>{item.postedBy.name}</h6>
                <h6>says: {item.title}</h6>
                <p>{item.body}</p>
                <input type='text' placeholder='Add some comment' />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

import React, { useContext } from 'react';
import '../styles/Home.css';
import Love from '../../assets/heart.png';
import LoveFilled from '../../assets/heart1.png';
import Delete from '../../assets/delete.png';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
export default function Home() {
  const [data, setData] = React.useState([]);
  const { state, dispatch } = useContext(UserContext);
  React.useEffect(() => {
    console.log(state);
    fetch('/allpost', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.posts);
        setData(res.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('like');
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unLikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('unlike');
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  const makeComment = (text, postId) => {
    if (document.getElementById('addsomecomment').value == '') {
      M.toast({
        html: 'Please add comment',
        classes: '#c62828 red darken-3',
      });
      return;
    }
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        M.toast({
          html: 'Successfully Commented',
          classes: '#c62828 green darken-3',
        });
        document.getElementById('addsomecomment').value = '';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };
  return (
    <div className='home'>
      {data.map((item) => {
        return (
          <>
            <div className='card home-card'>
              <div className='card-image'>
                <img alt='postImg' src={item.photo} />
              </div>
              <div className='card-content'>
                <div>
                  {item.likes.includes(state._id) ? (
                    <img
                      src={LoveFilled}
                      className='likeIcon'
                      alt='likeIconUnfilled'
                      onClick={() => {
                        unLikePost(item._id);
                      }}
                    />
                  ) : (
                    <img
                      src={Love}
                      className='likeIcon'
                      alt='likeIconUnfilled'
                      onClick={() => {
                        likePost(item._id);
                      }}
                    />
                  )}
                  {item.postedBy._id == state._id && (
                    <img
                      src={Delete}
                      className='likeIcon'
                      style={{ float: 'right' }}
                      onClick={() => deletePost(item._id)}
                    />
                  )}
                  <h6 style={{ marginTop: '5px' }}>
                    {item.likes.length} likes
                  </h6>
                </div>
                <h6 style={{ cursor: 'pointer' }}>
                  <Link
                    to={
                      item.postedBy._id !== state._id
                        ? '/profile/' + item.postedBy._id
                        : '/profile'
                    }
                  >
                    {item.postedBy.name}
                  </Link>
                </h6>
                <h6>says: {item.title}</h6>
                <p>{item.body}</p>
                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: '500', cursor: 'pointer' }}>
                        <Link
                          to={
                            record.postedBy._id !== state._id
                              ? '/profile/' + item.postedBy._id
                              : '/profile/'
                          }
                        >
                          {record.postedBy.name}
                        </Link>
                      </span>{' '}
                      {record.text}
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <input
                    type='text'
                    id='addsomecomment'
                    placeholder='Add some comment'
                  />
                </form>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

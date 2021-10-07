import React from 'react';

export default function CreatePost() {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [postImage, setPostImage] = React.useState('');
  return (
    <div
      className='card input-filed'
      style={{
        maxWidth: '50vh',
        margin: '5vh auto',
        padding: '5vh',
        textAlign: 'center',
      }}
    >
      <h4>Share your memory</h4>
      <input
        type='text'
        placeholder='Your title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Your caption'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className='file-field input-field'>
        <div className='btn'>
          <span>Upload</span>
          <input type='file' onChange={} />
        </div>
        <div className='file-path-wrapper'>
          <input className='file-path validate' type='text' />
        </div>
      </div>
      <button className='btn waves-effect waves-light #b64b5f6 blue drarken-1'>
        submit
      </button>
    </div>
  );
}

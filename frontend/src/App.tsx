import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { Post } from './types';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/');
    const json = await response.json();
    setPosts(json);
  };

  const addPost = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    const json = await response.json();
    return json;
  };

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {posts.map(post => (
          <div>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <button onClick={addPost}></button>
          </div>
        ))}
      </header>
    </div>
  );
};

export default App;

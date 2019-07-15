import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { sampleData } from './sampleData.js'

// import { Post } from './types';

const App = () => {
  const [posts, setPosts] = useState(sampleData['controls']);

  // const fetchPosts = async () => {
  //   const response = await fetch('http://localhost:5000/');
  //   const json = await response.json();
  //   setPosts(json);
  // };

  // const addPost = async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       title: 'foo',
  //       body: 'bar',
  //       userId: 1
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     }
  //   });
  //   const json = await response.json();
  //   return json;
  // };

  useEffect(() => {
    console.log(posts)
  }, [posts]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {posts.map(post => (
          <div>
            <h4>{post['residual index']}</h4>
          </div>
        ))}
      </header>
    </div>
  );
};

export default App;

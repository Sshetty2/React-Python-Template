import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import classNames from 'classnames';

import './App.css';

import { dataSet } from './dataSet';

import { Post } from './types';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userDataSet, setUserDataSet] = useState(dataSet);

  useEffect(() => {
    console.log(userDataSet);
  }, [userDataSet]);

  const addaCard = e => {
    let sign = window.prompt();
    let newList = [...userDataSet[e.target.id], sign];
    console.log(newList);
    setUserDataSet(newList);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {Object.keys(userDataSet).map((name, idx) => (
        <div
          style={{
            display: 'flex',
            justifyItems: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px 25px 0 25px',
            width: '25vh'
          }}
        >
          <p
            className={classNames('card', {
              purple: name === 'Winnie',
              teal: name === 'Bob',
              gray: name === 'Thomas',
              orange: name === 'George'
            })}
          >
            {name}
          </p>
          <div>
            <p>random card</p>
            {userDataSet[name].map(post => (
              <div>{post}</div>
            ))}
            <button id={name} onClick={addaCard}>
              Add a Card
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

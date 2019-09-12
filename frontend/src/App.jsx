// import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';

// import { Post } from './types';

// const App: React.FC = () => {
//   const [posts, setPosts] = useState<Array<Post>>([]);

//   const fetchPosts = async () => {
//     const response = await fetch('http://localhost:5000/');
//     const json = await response.json();
//     setPosts(json);
//   };

//   const addPost = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       body: JSON.stringify({
//         title: 'foo',
//         body: 'bar',
//         userId: 1
//       }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8'
//       }
//     });
//     const json = await response.json();
//     return json;
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [posts]);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {posts.map(post => (
//           <div>
//             <h4>{post.title}</h4>
//             <p>{post.body}</p>
//             <button onClick={addPost}></button>
//           </div>
//         ))}
//       </header>
//     </div>
//   );
// };

// export default App;



import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Chatbox from './components/Chatbox';
import './App.css';

class App extends Component {
  state = {
    from: 'codebeast',
    content: ''
  };
  componentDidMount() {
    const from = window.prompt('username');
    from && this.setState({ from });
    this._subscribeToNewChats();
  }
  _subscribeToNewChats = () => {
    this.props.allChatsQuery.subscribeToMore({
      document: gql`
        subscription messageCreated {
          messageCreated {
            id
            text
            isFavorite
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newChatLinks = [...previous.allChats, subscriptionData.data.Chat.node];
        const result = {
          ...previous,
          allChats: newChatLinks
        };
        console.log(result, previous, subscriptionData);
        return result;
      }
    });
  };
  _createChat = async e => {
    if (e.key === 'Enter') {
      const { content, from } = this.state;
      await this.props.createChatMutation({
        variables: { text: content }
      });
      this.setState({ content: '' });
    }
  };
  render() {
    const allChats = this.props.allChatsQuery.allChats || [];
    return (
      <div className="">
        <div className="container">
          <h2>Chats</h2>
          {allChats.map(message => (
            <Chatbox key={message.id} message={message} />
          ))}
          <input
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="text"
            placeholder="Start typing"
            onKeyPress={this._createChat}
          />
        </div>
      </div>
    );
  }
}

const ALL_CHATS_QUERY = gql`
  query allMessages {
    allMessages {
      text
      isFavorite
    }
  }
`;

const CREATE_CHAT_MUTATION = gql`
  mutation createMessage {
    createMessage(text: "hello") {
      id
      text
      isFavorite
    }
  }
`;

export default compose(
  graphql(ALL_CHATS_QUERY, { name: 'allChatsQuery' }),
  graphql(CREATE_CHAT_MUTATION, { name: 'createChatMutation' })
)(App);

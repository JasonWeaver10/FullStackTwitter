import React, { Component } from 'react'
import { render } from 'react-dom';
import './users.scss';


class Users extends Component {
  constructor() {
    super();
    this.state = {
      userTweets: []
    }
    

    this.fetchUserTweet = this.fetchUserTweet.bind(this);
  }

  fetchUserTweet() {
    fetch("./api/users/Jacob/tweets")
        .then((res) => res.json())
        .then((data) => data.tweets)
        .then((tweet) => {
            this.setState({userTweets: tweet});
          });
  };

  componentDidMount() {
      this.fetchUserTweet();
  };

  render() {
    return (
      <div className="tweetsDiv">
        <h1>User Tweets</h1>
          {this.state.userTweets.map((tweet) => 
          
          <ul key= {tweet.id} >
            <li>Message: {tweet.message}</li>
          </ul>
           )}
      </div>
    )
  }
}

export default Users;

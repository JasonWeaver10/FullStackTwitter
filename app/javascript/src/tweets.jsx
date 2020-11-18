import React, { Component } from 'react'
import { render, unstable_renderSubtreeIntoContainer } from 'react-dom';
import './tweets.scss';


class Tweets extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
    }

    this.showUserTweets = this.showUserTweets.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchTweet = this.fetchTweet.bind(this);
  }

  async fetchTweet() {
    let reset = document.querySelector('.resetButton');
    let userButton = document.querySelectorAll('.userButton');
    reset.classList.add("hidden");
    userButton.forEach((item) => {
      item.classList.remove("hidden");
    })
    try {
      let response = await fetch("./api/tweets");
      let data = await response.json();
      console.log(data.tweets);
      this.setState({tweets: data.tweets});
    } catch (err) {
      alert(err);
    }
   
  };

  async handleDelete(e) {
    e.preventDefault()
    let deleteNumber = e.target.dataset.id;
    const csrfToken = document.querySelector("[name='csrf-token']").content;

    try {
      await fetch('./api/tweets/' + deleteNumber, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'X-CSRF-Token': csrfToken,
          "Content-Type": 'application/json'
        },
      })
      this.fetchTweet();
    } catch(err) {
      alert(err);
    }
  }

  async showUserTweets(e) {
    let reset = document.querySelector('.resetButton');
    let userButton = document.querySelectorAll('.userButton');
    userButton.forEach((item) => {
      item.classList.add("hidden")
    });
    reset.classList.remove("hidden");
    let userTweets = e.target.dataset.id;
    try {
      let response = await fetch("./api/users/" + userTweets + "/tweets");
      let data = await response.json();
      this.setState({tweets: data.tweets});
    } catch(err) {
      alert(err);
    }
    
  };

  componentDidMount() {
      this.fetchTweet();
  };

  render() {
    
    return (
      <div className="tweetsDiv">
        <h1 className="tweetTitle">Tweets</h1>
        <button className="resetButton" onClick={this.fetchTweet}>Go back to Full Tweet List</button>
          {this.state.tweets.map((tweet) => 
          <div className="tweet" key= {tweet.id}>
            <h2 > {tweet.username}</h2>
            <h4>{tweet.message}</h4>
            <button className="delete" data-id={tweet.id} onClick={this.handleDelete}>Delete</button>
            <button className="userButton" data-id={tweet.username} onClick={this.showUserTweets}> See More From {tweet.username} </button>
          </div>
           )}
      </div>
    )
  }
}

export default Tweets;

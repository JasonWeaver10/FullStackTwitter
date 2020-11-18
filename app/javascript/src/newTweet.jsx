import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import './newTweet.scss';

class NewTweet extends Component {
  constructor() {
    super();
    this.state = {
      tweet: '',
      redirect: null
    };

    this.newTweetRequest = this.newTweetRequest.bind(this);
    this.newTweetBody = this.newTweetBody.bind(this);
  }

  async newTweetRequest(e) {
    e.preventDefault();
    const csrfToken = document.querySelector("[name='csrf-token']").content;

    const requestOptions = {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ tweet: {
                              message: this.state.tweet,
                            }
                          })
    };
    try {
      let response = await fetch('./api/tweets', requestOptions)
      let data = await response.json();
      this.setState({ redirect: '/tweets'});
    } catch(err) {
      alert("You need to Log in before you can tweet!");
    }
    
  }

  newTweetBody(e) {
    e.preventDefault();
    this.setState({ tweet: e.target.value })
  }



  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="newTweetDiv">
        <div className="formDiv">
          <form>
            
            <textarea className="tweetText" placeholder="Type New Tweet" onChange={this.newTweetBody}>
            </textarea>
            <button className="tweetSubmit" onClick={this.newTweetRequest}>Tweet!</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewTweet;

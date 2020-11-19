import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './wrapper.scss';
import Header from './header'; 
import Login from './login';
import NewTweet from './newTweet';
import Tweets from './tweets';
import Users from './users';
import Footer from './footer';


class Wrapper extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Guest'
    }
    this.handleSession = this.handleSession.bind(this);
  }

  handleSession() {
    fetch('./api/authenticated')
    .then((res) => res.json())
    .then((data) => {
      let username = data.username
      let authenticated = data.authenticated
      if (authenticated) {
        this.setState({currentUser: username});
      } else {
        this.setState({currentUser: "Guest"})
      }
    })
  }

  componentDidMount() {
    this.handleSession();
  };

  render () {
    return (
      <div className="content">
      <Router>
      <Header currentUser = {this.state.currentUser}/>
      <div className="homeDiv">
        <Switch  >
          <Route exact path="/users" component={ Users } />
          <Route exact path="/newTweet" component={ NewTweet }/>
          <Route exact path="/tweets" render={(props) => 
            <Tweets {...props} currentUser={this.state.currentUser}/>
          } 
          />
          <Route path = "/" component={ Login }/>
        </Switch>
      </div>
      </Router>
      <Footer></Footer>
    </div> 
    )
  }
}

export default Wrapper;
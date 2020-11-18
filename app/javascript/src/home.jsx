import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './home.scss';
import Header from './header'; 
import Login from './login';
import NewTweet from './newTweet';
import Tweets from './tweets';
import Users from './users';
import Footer from './footer';

const Home = props => (
  <div className="content">

    <Router>
    <Header></Header>
        <div className="homeDiv">
          <Switch>
            <Route exact path="/users" component={ Users } />
            <Route exact path="/newTweet" component={ NewTweet }/>
            <Route exact path="/tweets" component ={ Tweets } />
            <Route path = "/" component={ Login }/>
          </Switch>
        </div>
    </Router>
    <Footer></Footer>
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})

import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './header.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout() {
  const csrfToken = document.querySelector("[name='csrf-token']").content;
    fetch('./api/sessions', {
      method: 'delete',
      headers: {
        'X-CSRF-Token': csrfToken,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify()
    });
    alert("You have successfully logged out!");
    window.location = '/login';
  };

  

  render() {
    
    return (
      <div className="headerDiv">
        <nav className="header">
          <h1 className="mainTitle">JTwitter</h1>
          <h3 className="headerUsername">Welcome {this.props.currentUser}
          </h3>
          <ul className="mobileNav">
            <li className="mobilenavItem">Tweet</li>
            <li className="mobileNavItem">Login</li>
            <li className="mobileNavItem">Users</li>
            <li className="mobileNavItem">Logout</li>
          </ul>
          <Link className="nav-link newLink" to="/newTweet" role="button">New Tweet</Link>
          <Link className="nav-link homeLink" to="/login" role="button">Login</Link>
          <Link className="nav-link usersLink" to="/tweets" role="button">Tweets</Link>
          <button className="logoutButton" onClick={this.handleLogout}>Log Out</button>
        </nav>
      </div>
    )
  }
}

export default Header;
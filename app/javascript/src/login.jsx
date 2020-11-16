import React, {Component} from 'react'
import './login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {username: '',
                  password: '',
                  email: '',
                  loginUserName: '',
                  loginPassword: ''
                  };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.resetDefaults = this.resetDefaults.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }



  resetDefaults() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
  };

  handleNewUser(e) {
    e.preventDefault();

    let newUser = { user: {
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email
                    }
                  };
    const csrfToken = document.querySelector("[name='csrf-token']").content;

    fetch('http://localhost:3000/api/users', {
      method: 'post',
      headers: {
        'X-CSRF-Token': csrfToken,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    this.resetDefaults();
  };

  handleChange(e) {
    e.preventDefault();
   this.setState({
     [e.target.name]: e.target.value
   });
  };

  handleLogin(e) {
    e.preventDefault();
    let returningUser = {
      user: {
        username: this.state.loginUserName,
        password: this.state.loginPassword
      }
    };
    const csrfToken = document.querySelector("[name='csrf-token']").content;

    fetch('http://localhost:3000/api/sessions', {
      method: 'post',
      headers: {
        'X-CSRF-Token': csrfToken,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(returningUser)
    })
    this.resetDefaults();  
  };
  

 
  render () {
  return (<div className="loginHomeDiv">
   
    <div className="info">
      <h3>Welcome to JTwitter!</h3>
      <p>JTwitter is a state of the art social media platform for all ages.</p>
      <p>Sign up for an account today to start sharing</p>
    </div>

    <div className='createAccount'>
      <h3>Create a JTwitter Account</h3>
      <form>
        <input type = 'textbox' placeholder="Username" name="username" onChange={this.handleChange}></input><br/>
        <input type = "text" placeholder="Email Address" name="email" onChange={this.handleChange}></input><br/>
        <input type = "text" placeholder="Password" name="password" onChange={this.handleChange}></input><br/>
        <button className="submitButton" type="submit" onClick={this.handleNewUser}>Submit</button>
      </form>
    </div>

    <div className="login">
      <h3>Log in to your Account</h3>
      <input type = 'textbox' placeholder="Username" name="loginUserName" onChange={this.handleChange}></input><br/>
      <input type = "text" placeholder="Password" name="loginPassword" onChange={this.handleChange}></input><br/>
      <button className = "loginButton" onClick={this.handleLogin}>Log In</button>
    </div>
    
  </div>

  )}
}

export default Login;

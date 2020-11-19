 
import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss'
import Wrapper from './wrapper';


const Home = props => (
  <div className="home">
    <Wrapper />
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})

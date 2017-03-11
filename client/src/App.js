import React, { Component } from 'react';
import './App.css';
import Content from './Content';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='top-navigation'>
          <div className='title-container'>
            <a href={window.location.href}>ATELIER</a>
          </div>
        </div>
        <div className='App-content'>
          <div className='alert'>
            <span></span>
          </div>
          <Content/>
        </div>
        <div className='clearfix'></div>
      </div>
    );
  }
}

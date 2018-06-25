import React, { Component } from 'react';
import logo from './logo.png';
import './base.css';

class Base extends Component {
  render() {
    return (
      <div className="base">
        <div>
          <img src={logo} className="base-header" alt="logo" />
        </div>
      </div>
    );
  }
}

export default Base;

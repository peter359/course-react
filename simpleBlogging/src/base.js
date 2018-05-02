import React, { Component } from 'react';
import logo from './logo.svg';
import './base.css';

class Base extends Component {
  render() {
    return (
      <div className="base">
        <div className="base-header">
          <img src={logo} className="base-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default Base;

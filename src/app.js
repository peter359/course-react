import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './index.css';
import './app.css';
import { Route, Link , withRouter} from 'react-router-dom';
import Base from './base';
import Blogposts from './components/blogposts';
import BlogpostForm from './components/blogpost-form'

@withRouter
class App extends Component {
  state = {
    blogposts: [],
    filter: 'all'
  };

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div className="container">
        <ul className="main-menu">
          <li><Link to="/blogposts/all">All Blogposts</Link></li>
          <li><Link to="/blogposts/latest">Latest Blogposts</Link></li>
          <li><Link to="/blogposts/add">Add Blogpost</Link></li>
        </ul>
        <hr />
        <Route path="/" component={Base} />
        <Route path="/blogposts/all" render={ props => (<Blogposts {...props} blogposts={this.state.blogposts} onBlogpostSubmit={this.onBlogpostSubmit} onDeleteBlogpost={this.onDeleteBlogpost} />)} />
        <Route path="/blogposts/latest" render={ props => (<Blogposts {...props} blogposts={this.state.blogposts} filter={this.state.filter} handleFilterChange={this.handleFilterChange} />)} />
        <Route path="/blogposts/add" render={ props => (<BlogpostForm {...props} onBlogpostSubmit={this.onBlogpostSubmit} />)} />
      </div>
    );
  }

  handleFilterChange = e => {
    this.setState({filter: e.target.value});
  }

  onBlogpostSubmit = (add, blogpost) => {
    if (add) {
      this.setState(prevState => ({
        blogposts: [
          ...prevState.blogposts,
          blogpost
        ]
      }));
    } else {
      this.setState(prevState => ({
        blogposts: prevState.blogposts.map(bp => bp.id === blogpost.id ? blogpost : bp)
      }));
    }
  }

  onDeleteBlogpost = (id) => {
    this.setState(prevState => ({
      blogposts: prevState.blogposts.filter(blogpost => blogpost.id !== id)
    }));
  }

}

export default App;

import React from "react";
import newId from './newid'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
export default class BlogpostForm extends React.Component {
  static propTypes = {
    onBlogpostSubmit: PropTypes.func,
    location: PropTypes.object.isRequired
  };

  state = {
      title: '',
      author: '',
      text: '',
      tags: '',
      url: '',
      status: 'active'
    };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  };

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleTagsChange = (e) => {
    this.setState({ tags: e.target.value });
  };

  handleURLChange = (e) => {
    this.setState({ url: e.target.value });
  };

  handleStatusChange = (e) => {
    this.setState({ status: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    var title = this.state.title.trim();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    var tags = this.state.tags.trim();
    var url = this.state.url.trim();
    var status = this.state.status.trim();
    if (!text || !author || !title || !tags || !status) {
      return;
    }
    var add = this.props.location.pathname === '/blogposts/add' ? true : false;
    var id = add ? newId() : this.props.id;
    var published = new Date();
     this.props.onBlogpostSubmit(add, {id, published, title, author, text, tags, url, status});
     this.setState({author: '', text: '', title: '', tags: '', url: '', status: 'active' });
  };

  render(props) {
    const { location } = this.props;
    const btnName = location.pathname === '/blogposts/add' ? "Add" : "Edit";
    return (
      <form className="blogpostForm" onSubmit={this.handleSubmit}>
        <input
            className="form-control col-lg-3"
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
          />
        <input
            className="form-control col-lg-3"
          type="text"
          placeholder="Author"
          value={this.state.author}
          onChange={this.handleAuthorChange}
          />
        <textarea
            className="form-control col-lg-3"
          type="text"
          placeholder="Text"
          value={this.state.text}
          onChange={this.handleTextChange}
          />
        <input
            className="form-control col-lg-3"
          type="text"
          placeholder="Tags"
          value={this.state.tags}
          onChange={this.handleTagsChange}
          />
        <input
            className="form-control col-lg-3"
          type="text"
          placeholder="URL"
          value={this.state.url}
          onChange={this.handleURLChange}
          />
        <select
            className="form-control col-lg-3"
            value={this.state.status}
            onChange={this.handleStatusChange}
            >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>
        <input type="submit" disabled={!this.state.author || !this.state.text || !this.state.title || !this.state.tags || !this.state.status} value={btnName} />
      </form>
    );
  }
}

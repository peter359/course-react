import React from 'react';
// import { Link, Route } from 'react-router-dom';
import { getMarkdown } from './helper';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import BlogpostForm from './blogpost-form';

@withRouter
export default class Blogpost extends React.Component {
  static propTypes = {
    onDeleteBlogpost: PropTypes.func,
    location: PropTypes.object.isRequired
  }

    render(props) {
        const { blogpost, location, onDeleteBlogpost } = this.props;
        const list = location.pathname === '/blogposts/latest' ? (
            <li key={blogpost.id}>
                {blogpost.title} - {blogpost.author}
                <span dangerouslySetInnerHTML={ getMarkdown(blogpost.text.substring(0, 150)) }></span>
            </li>
        ) : (
            <li key={blogpost.id}>
                {blogpost.title} - {blogpost.author}
                <span dangerouslySetInnerHTML={ getMarkdown(blogpost.text) }></span>
                <button
                title="Delete blogpost"
                className="btn btn-sm btn-danger pull-right"
                onClick={() => onDeleteBlogpost(blogpost.id)}
                >
                <span className="glyphicon glyphicon-remove" />
                </button>
                <button
                title="Edit blogpost"
                className="btn btn-sm btn-warning pull-right"
                >
                <span className="glyphicon glyphicon-pencil" >
                    {/* <Link to={`/blogposts/${blogpost.id}`} /> */}
                </span>
                </button>
            </li>
            // <Route path="/blogposts/:id" render={ props => (<BlogpostForm {...props} onBlogpostSubmit={this.onBlogpostSubmit} />)} /> }
        );
        return (
            <div>
                {list}
            </div>
        )
    }
};

import React from 'react';
import Blogpost from './blogpost';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
export default class Blogposts extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render(props) {
    const { blogposts, filter, location, handleFilterChange, onDeleteBlogpost } = this.props;
    const list = location.pathname === '/blogposts/latest' ? (
        <ul>
            <TransitionGroup>
                {blogposts
                .filter(blogpost => filter === 'all' || blogpost.status === filter)
                .sort((b1, b2) => b2.published - b1.published)
                .slice(0, 15)
                .map((blogpost, index) => (
                    <CSSTransition key={blogpost.id} timeout={500}>
                    <Blogpost blogpost={blogpost} index={index} {...props} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    ) : (
        <ul>
            <TransitionGroup>
                {blogposts
                .map((blogpost, index) => (
                    <CSSTransition key={blogpost.id} timeout={500} classNames="todos">
                    <Blogpost blogpost={blogpost} index={index} onDeleteBlogpost={onDeleteBlogpost} {...props} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
    const filtersjx = location.pathname === '/blogposts/latest' ? (
        <div className="row">
            <div className="col-lg-2">
                <select
                className="form-control col-lg-3"
                value={filter}
                onChange={handleFilterChange}
                >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>
    ) : (<hr/>);

    return (
      <div>
        {filtersjx}
        {list}
      </div>
    )
  }
}

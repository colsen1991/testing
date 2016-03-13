import React, { Component } from 'react';
import {
  Link,
  browserHistory
} from 'react-router';
import { connect } from 'react-redux';
import { fetchAllBlogsActionCreator } from '../../actions';
import Spinner from '../spinner';
import RequestWentToShit from '../errors/requestWentToShit';
import styles from './admin.styl';

function sortByDate({ date: a }, { date: b }) {
  return new Date(a).getTime() - new Date(b).getTime();
}

export const BlogTable = ({ blogs }) => {
  return (
    <table>
      <thead>
      <tr>
        <td><strong>Title</strong></td>
        <td><strong>Date</strong></td>
        <td><strong>Published</strong></td>
      </tr>
      </thead>
      <tbody>
      {
        blogs.sort(sortByDate).map(({ id, title, date, published }) => {
          return (
            <tr key={id}>
              <td><Link to={`/admin/blog/${id}`}>{title}</Link></td>
              <td>{new Date(date).toUTCString()}</td>
              <td>{published ? 'Yes' : 'No'}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
};

export class Admin extends Component {
  componentWillMount() {
    if (!this.props.loggedIn)
      browserHistory.push('/login');
  }

  componentDidMount() {
    if (this.props.loggedIn)
      this.props.fetchAllBlogs();
  }

  render() {
    const { fetching, error, data } = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit status={data.response.status}/>;

    return (
      <div className={styles.admin}>
        <h1>Admin</h1>
        <Link to="/admin/newBlog" className={styles.newBlogLink}>Write new Blog post</Link>
        <BlogTable blogs={data}/>
      </div>
    );
  }
}

function mapStateToProps({ login: { loggedIn, token }, allBlogs }) {
  return { loggedIn, token, ...allBlogs };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllBlogsWrapper: (token) => () => fetchAllBlogsActionCreator(token)(dispatch)
  }
}

function mergeProps({ token, ...stateProps }, { fetchAllBlogsWrapper }, ignore) {
  return { ...stateProps, fetchAllBlogs: fetchAllBlogsWrapper(token) };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Admin);
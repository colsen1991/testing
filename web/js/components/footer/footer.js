import React from 'react';
import { Link } from 'react-router';
import styles from './footer.styl';

export default () => (
  <footer className={styles.footer}>
    <span>This site is protected by some copyright bullshit but not really cus open-source...</span>
    <span>Admin? <Link to='/login'>Login</Link></span>
  </footer>
)
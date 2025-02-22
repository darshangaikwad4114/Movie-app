import React from 'react';
import styles from './SkipLink.module.css';

const SkipLink = () => (
  <a 
    href="#main-content"
    className={styles.skipLink}
    onFocus={(e) => e.target.classList.add(styles.visible)}
    onBlur={(e) => e.target.classList.remove(styles.visible)}
  >
    Skip to main content
  </a>
);

export default SkipLink;

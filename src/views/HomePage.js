import React from 'react';

import styles from './common.module.scss';
const HomePage = () => (
  <div className={styles.mainTitle}>
    <h1>Welcome to the PhoneBook!</h1>
    <img
      className={styles.image}
      src="https://image.flaticon.com/icons/png/512/1251/1251743.png"
      alt=""
    />
  </div>
);

export default HomePage;

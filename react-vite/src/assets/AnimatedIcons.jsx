import React from 'react';
import styles from './AnimatedIcons.module.css';

function SunnyIcon() {
    return <div className={styles.sunny}></div>;
  }

  function CloudyIcon() {
    return <div className={styles.cloudy}></div>;
  }

  function RainyIcon() {
    return <div className={styles.rainy}></div>;
  }
  function Moon() {
    return <div className={styles.moon}></div>;
  }

  
  // Export components using named exports
  export { SunnyIcon, RainyIcon, CloudyIcon, Moon };
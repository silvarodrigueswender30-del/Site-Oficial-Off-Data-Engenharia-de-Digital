import React from 'react';
import styles from './RealEstateWebsitePage.module.css';

const RealEstateWebsiteIntro = () => (
  <section id="diagnostico" className={styles.editorial}>
    <div class={styles.splitIntro}>
      <div className={styles.introTitle}>
        <h2>{{INTRO_TITLE}}</h2>
      </div>
      <div className={styles.introCopy}>
        <p>{{INTRO_P1}}</p>
        <p>{{INTRO_P2}}</p>
        <p>{{INTRO_P3}}</p>
      </div>
    </div>
  </section>
);

export default RealEstateWebsiteIntro;

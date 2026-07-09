import React from 'react';
import styles from './RealEstateWebsitePage.module.css';

export const faqItems = [
  {
    question: '{{FAQ_1_Q}}',
    answer: '{{FAQ_1_A}}',
  },
  {
    question: '{{FAQ_2_Q}}',
    answer: '{{FAQ_2_A}}',
  },
  {
    question: '{{FAQ_3_Q}}',
    answer: '{{FAQ_3_A}}',
  },
  {
    question: '{{FAQ_4_Q}}',
    answer: '{{FAQ_4_A}}',
  },
  {
    question: '{{FAQ_5_Q}}',
    answer: '{{FAQ_5_A}}',
  },
];

const RealEstateWebsiteFaq = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.faqInner}>
      <div className={styles.faqHeading}>
        <span>FAQ</span>
        <h2>{"{{FAQ_TITLE}}"}</h2>
      </div>
      <div className={styles.faqList}>
        {faqItems.map((item, index) => (
          <details key={item.question} className={styles.faqItem}>
            <summary><span>0{index + 1}</span><h3>{item.question}</h3><b aria-hidden="true">+</b></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default RealEstateWebsiteFaq;

import React from 'react';
import styles from './RealEstateWebsitePage.module.css';

const questions = [
  {
    title: '{{Q1_TITLE}}',
    paragraphs: [
      '{{Q1_TEXT_P1}}',
      '{{Q1_TEXT_P2}}',
    ],
  },
  {
    title: '{{Q2_TITLE}}',
    paragraphs: [
      '{{Q2_TEXT_P1}}',
      '{{Q2_TEXT_P2}}',
    ],
  },
  {
    title: '{{Q3_TITLE}}',
    paragraphs: [
      '{{Q3_TEXT_P1}}',
      '{{Q3_TEXT_P2}}',
    ],
  },
];

const RealEstateWebsiteQuestionSections = () => (
  <section className={styles.questions} data-section="light">
    <div className={styles.questionsInner}>
      {questions.map((item, index) => (
        <article className={styles.questionBlock} key={item.title}>
          <span className={styles.questionIndex}>0{index + 1}</span>
          <h2>{item.title}</h2>
          <div>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </article>
      ))}
    </div>
  </section>
);

export default RealEstateWebsiteQuestionSections;

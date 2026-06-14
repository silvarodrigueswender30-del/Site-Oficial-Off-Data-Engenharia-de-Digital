import React from 'react';
import styles from '../../styles/ImmersiveSites.module.css';

const FlowLines = () => {
  return (
    <div className={styles.flowLinesContainer}>
      <svg
        className={styles.flowSvg}
        width="100%"
        viewBox="0 0 1919 960"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <g clipPath="url(#c8clipTop)">
          <path
            className={styles.flowLineMain}
            d="M2010.5 943.5H1366.5C1355.45 943.5 1346.5 934.546 1346.5 923.5V513C1346.5 501.954 1337.55 493 1326.5 493H1065.5C1054.45 493 1045.5 484.046 1045.5 473V258C1045.5 246.954 1036.55 238 1025.5 238H427C415.954 238 407 246.954 407 258V356C407 367.046 398.046 376 387 376H266C254.954 376 246 367.046 246 356V51C246 39.9543 237.046 31 226 31H-92"
            stroke="url(#c8gradTopMain)"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <path
            className={styles.flowLinePulse}
            d="M2010.5 943.5H1366.5C1355.45 943.5 1346.5 934.546 1346.5 923.5V513C1346.5 501.954 1337.55 493 1326.5 493H1065.5C1054.45 493 1045.5 484.046 1045.5 473V258C1045.5 246.954 1036.55 238 1025.5 238H427C415.954 238 407 246.954 407 258V356C407 367.046 398.046 376 387 376H266C254.954 376 246 367.046 246 356V51C246 39.9543 237.046 31 226 31H-92"
            stroke="rgba(111, 227, 255, 0.8)"
            fill="none"
            pathLength="1000"
            strokeDasharray="120 880"
            strokeWidth="2"
          />
        </g>
        <defs>
          <linearGradient id="c8gradTopMain" x1="74.5" y1="-16.9999" x2="1957" y2="967.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(4, 74, 179, 0)" />
            <stop offset="0.5" stopColor="rgba(4, 74, 179, 1)" />
            <stop offset="1" stopColor="rgba(4, 74, 179, 0)" />
          </linearGradient>
          <clipPath id="c8clipTop">
            <rect width="1919" height="960" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default FlowLines;

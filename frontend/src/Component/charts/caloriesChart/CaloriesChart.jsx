// src/components/CaloriesChart.js
import React from 'react';

function CaloriesChart({ percentage }) {
  return (
    <div className="calories-chart">
      <svg className="circle-chart" viewBox="0 0 36 36">
        <path
          className="circle-chart-bg"
          d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 0 0 0-31.831"
        />
        <path
          className="circle-chart-fill"
          strokeDasharray={`${percentage} 100`}
          d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 0 0 0-31.831"
        />
      </svg>
    </div>
  );
}

export default CaloriesChart;

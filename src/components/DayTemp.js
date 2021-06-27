import './DayTemp.css';

import React from 'react';

const DayTemp = ({ day, temp = '/', unit = 'c' }) => {
  return (
    <div className="d-flex flex-column align-items-center p-4">
      <span className="day-name text-uppercase">{day}</span>
      <span className="day-temp text-light">
        {temp}
        <sup className="text-uppercase">&#176;{unit}</sup>
      </span>
    </div>
  );
};

export default DayTemp;

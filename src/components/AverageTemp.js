import './AverageTemp.css';

import dayjs from 'dayjs';
import React from 'react';

const AverageTemp = ({ temp, unit, startDate, endDate }) => {
  const getMonthName = (date) => dayjs(date).format('MMMM');
  const getDateOfMonth = (date) => dayjs(date).date();
  const getYear = (date) => dayjs(date).year();
  const showEndMonth =
    getMonthName(startDate) === getMonthName(endDate) ? false : true;

  return (
    <div className="d-flex flex-column align-items-center pt-5">
      <span className="date-range text-uppercase">
        {getMonthName(startDate)} {getDateOfMonth(startDate)} -{' '}
        {showEndMonth && getMonthName(endDate)} {getDateOfMonth(endDate)}{' '}
        {getYear(endDate)}
      </span>
      <h1 className="temp text-light py-4">
        {temp}
        <span className="temp-unit text-uppercase">&#176;{unit}</span>
      </h1>
    </div>
  );
};

export default AverageTemp;

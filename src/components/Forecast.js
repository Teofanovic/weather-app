import dayjs from 'dayjs';
import React from 'react';

import DayTemp from './DayTemp';

const Forecast = ({ forecast }) => {
  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center pt-2">
      {Object.keys(forecast).map((key, index) => {
        return (
          <DayTemp
            dateString={key}
            day={dayjs(key).format('dddd')}
            temp={forecast[key]}
          />
        );
      })}
    </div>
  );
};

export default Forecast;

import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import React from 'react';

dayjs.extend(dayjsPluginUTC);

const SunTimes = ({ sunrise, sunset, timezoneOffset }) => {
  const offsetInMinutes = Math.round(timezoneOffset / 60);

  const sunriseTime = sunrise.utcOffset(offsetInMinutes).format('HH:mm');
  const sunsetTime = sunset.utcOffset(offsetInMinutes).format('HH:mm');

  return (
    <div
      className="d-flex justify-content-center pt-3"
      style={{ fontSize: '30px' }}
    >
      <div className="d-flex flex-column align-items-center p-4">
        <strong style={{ fontSize: '16px' }}>Sunrise</strong>
        <strong className="text-light">{sunriseTime}</strong>
      </div>
      <div className="d-flex flex-column align-items-center p-4">
        <strong style={{ fontSize: '16px' }}>Sunset</strong>
        <strong className="text-light">{sunsetTime}</strong>
      </div>
    </div>
  );
};

export default SunTimes;

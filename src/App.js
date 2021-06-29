import './App.css';

import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

import AverageTemp from './components/AverageTemp';
import Forecast from './components/Forecast';
import SearchBox from './components/SearchBox';
import SunTimes from './components/SunTimes';

const App = () => {
  const weatherApiKey = process.env.REACT_APP_OPEN_WEATHER_KEY;

  const [forecast, setForecast] = useState(null);
  const [totalAverage, setTotalAverage] = useState(null);
  const [sunTimes, setSunTimes] = useState(null);
  const [error, setError] = useState('');

  const hotTemp = 25;
  const warmTemp = 10;
  const coldTemp = 0;

  const setupForecast = (data) => {
    if (data) {
      setSunTimes({
        sunrise: dayjs.unix(data.city?.sunrise),
        sunset: dayjs.unix(data.city?.sunset),
        timezoneOffset: data.city?.timezone,
      });

      let weather = {};
      // get all temps grouped by days
      data.list.forEach((period) => {
        const dayInMonth = dayjs.unix(period.dt).format('YYYY-MM-DD');
        if (dayInMonth in weather) {
          weather[dayInMonth] = [...weather[dayInMonth], period.main.temp];
        } else {
          weather[dayInMonth] = [period.main.temp];
        }
      });

      // find average temp for each day
      for (const property in weather) {
        const tempsSum = weather[property].reduce((a, b) => a + b);
        let averageTemp = tempsSum / weather[property].length;
        averageTemp = Math.round(+averageTemp);

        weather[property] = averageTemp;
      }

      // get average of all available days
      let totalAmount = 0;
      for (const property in weather) {
        totalAmount += weather[property];
      }
      const average = Math.round(totalAmount / Object.keys(weather).length);

      setTotalAverage(average);
      setForecast(weather);
    }
  };

  const getForecast = (cityName, countryCode) => {
    setError('');
    setForecast('');
    setTotalAverage('');
    if (cityName) {
      axios
        .get('http://api.openweathermap.org/data/2.5/forecast', {
          params: {
            q: `${cityName},${countryCode}`,
            appid: weatherApiKey,
            units: 'metric',
          },
        })
        .then((res) => setupForecast(res.data))
        .catch((err) => {
          console.error(err);
          setError(err.response?.data?.message);
        });
    } else {
      setError('Please enter a city name');
    }
  };

  const getBackgroundColorClass = (temp) => {
    if (!temp) {
      return 'default';
    }
    if (temp > hotTemp) {
      return 'hot';
    }
    if (temp >= warmTemp && temp <= hotTemp) {
      return 'warm';
    }
    if (temp >= coldTemp && temp < warmTemp) {
      return 'cold';
    }
    if (temp < coldTemp) {
      return 'freezing';
    }
  };

  const containerClass =
    forecast || totalAverage ? '' : 'd-flex justify-content-center flex-column';

  return (
    <Container
      fluid
      className={`main-container ${containerClass} ${getBackgroundColorClass(
        totalAverage
      )}`}
    >
      <SearchBox getForecast={getForecast} setError={setError} />
      {totalAverage && !error && (
        <AverageTemp
          temp={totalAverage}
          unit="c"
          startDate={dayjs()}
          endDate={dayjs().add(4, 'day')}
        />
      )}
      {forecast && !error && <Forecast forecast={forecast} />}
      {sunTimes && !error && (
        <SunTimes
          sunrise={sunTimes.sunrise}
          sunset={sunTimes.sunset}
          timezoneOffset={sunTimes.timezoneOffset}
        />
      )}
      {error && (
        <div className="d-flex justify-content-center text-capitalize py-4">
          <h2>{error}</h2>
        </div>
      )}
    </Container>
  );
};

export default App;

import './App.css';

import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

import AverageTemp from './components/AverageTemp';
import Forecast from './components/Forecast';
import SearchBox from './components/SearchBox';

const App = () => {
  const weatherApiKey = process.env.REACT_APP_OPEN_WEATHER_KEY;

  const [forecast, setForecast] = useState(null);
  const [totalAverage, setTotalAverage] = useState(null);
  const [error, setError] = useState('');

  const setupForecast = (data) => {
    if (data) {
      let weather = {};
      // get all temps grouped by days
      data.forEach((period) => {
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

  const getForecast = (cityName) => {
    setError('');
    setForecast('');
    setTotalAverage('');
    axios
      .get('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: cityName,
          appid: weatherApiKey,
          units: 'metric',
        },
      })
      .then((res) => setupForecast(res.data.list))
      .catch((err) => {
        setError(err.response?.data?.message);
      });
  };

  const containerClass =
    forecast || totalAverage ? '' : 'd-flex justify-content-center flex-column';

  return (
    <Container fluid className={`main-container ${containerClass}`}>
      <SearchBox getForecast={getForecast} />
      {totalAverage && !error && (
        <AverageTemp
          temp={totalAverage}
          unit="c"
          startDate={dayjs()}
          endDate={dayjs().add(4, 'day')}
        />
      )}
      {forecast && !error && <Forecast forecast={forecast} />}
      {error && (
        <div className="d-flex justify-content-center text-capitalize py-4">
          <h2>{error}</h2>
        </div>
      )}
    </Container>
  );
};

export default App;

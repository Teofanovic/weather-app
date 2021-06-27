import './App.css';

import dayjs from 'dayjs';
import { Container } from 'react-bootstrap';

import AverageTemp from './components/AverageTemp';
import DayTemp from './components/DayTemp';
import SearchBox from './components/SearchBox';

const App = () => {
  return (
    <Container fluid className="main-container">
      <SearchBox />
      <AverageTemp
        temp={15}
        unit="c"
        startDate={dayjs()}
        endDate={dayjs().add(5, 'day')}
      />
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center pt-2">
        {[10, 14, 13, 14, 17].map((temp) => {
          return <DayTemp day="Monday" temp={temp} />;
        })}
      </div>
    </Container>
  );
};

export default App;

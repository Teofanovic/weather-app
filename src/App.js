import './App.css';

import { Container } from 'react-bootstrap';

import SearchBox from './components/SearchBox';

function App() {
  return (
    <Container fluid className="main-container">
      <SearchBox />
    </Container>
  );
}

export default App;

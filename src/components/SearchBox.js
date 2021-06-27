import './SearchBox.css';

import axios from 'axios';
import React from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';

import searchIcon from '../assets/images/search.png';
import weather from '../assets/images/weather.png';

const SearchBox = (props) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.getForecast(event.target.value);
    }
  };

  return (
    <Row
      className="p-4 justify-content-center"
      style={
        !props.isShowingResults ? { paddingTop: '100px' } : { paddingTop: '0' }
      }
    >
      <Col
        xs={12}
        md={10}
        lg={7}
        xl={6}
        className="p-3 border rounded row align-items-center justify-content-center bg-light shadow"
      >
        <Col sm={1} className="d-none d-sm-flex justify-content-center">
          <img src={weather} alt="" className="weather-icon" />
        </Col>
        <Col xs={3} className="d-flex justify-content-center">
          <Dropdown>
            <Dropdown.Toggle
              variant="info"
              id="dropdown-basic"
              size="lg"
              className="country-dropdown"
            >
              Country
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={8} className="position-relative">
          <img src={searchIcon} alt="" className="search-icon" />
          <input
            type="text"
            className="form-control form-control-lg"
            id="location"
            placeholder="Please enter your location..."
            onKeyDown={handleKeyDown}
          />
        </Col>
      </Col>
    </Row>
  );
};

export default SearchBox;

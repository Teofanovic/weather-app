import './SearchBox.css';

import React, { useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';

import searchIcon from '../assets/images/search.png';
import weather from '../assets/images/weather.png';
import countries from '../constants/countries';

const SearchBox = ({ setError, getForecast }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (!selectedCountry) {
        setError('Please select a country!');
      } else {
        getForecast(event.target.value, selectedCountry.code);
      }
    }
  };

  return (
    <Row className="p-4 justify-content-center">
      <Col
        xs={12}
        md={10}
        lg={8}
        xl={7}
        className="p-3 border rounded row align-items-center justify-content-center bg-light shadow"
      >
        <Col md={1} className="d-none d-md-flex justify-content-center">
          <img src={weather} alt="" className="weather-icon" />
        </Col>
        <Col
          xs={12}
          sm={3}
          md={2}
          className="d-flex justify-content-center pb-3 pb-sm-0"
        >
          <Dropdown>
            <Dropdown.Toggle
              size="lg"
              className="country-dropdown d-flex align-items-center text-dark background-white"
            >
              {selectedCountry ? (
                <>
                  <img
                    src={`https://www.countryflags.io/${selectedCountry.code}/flat/24.png`}
                    alt=""
                  />
                  <span className="px-1">{selectedCountry.code}</span>
                </>
              ) : (
                'Country'
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {countries.map((country) => (
                <Dropdown.Item
                  onClick={() => setSelectedCountry(country)}
                  key={country.code}
                >
                  {country.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} sm={9} className="position-relative">
          <img src={searchIcon} alt="" className="search-icon" />
          <input
            type="text"
            className="form-control form-control-lg"
            id="location"
            placeholder="Please enter your location..."
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </Col>
      </Col>
    </Row>
  );
};

export default SearchBox;

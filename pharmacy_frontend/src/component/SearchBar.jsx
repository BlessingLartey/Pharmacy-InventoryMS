import React from 'react';

import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

function SearchBar({setResults}) {


     //serach functionality
  const fetchData = (value) => {
    fetch("http://localhost:8000/api/drugs")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((drug) => {
          return (
            value &&
            drug &&
            drug.drugName &&
            drug.drugName.toLowerCase().includes(value) || drug && drug.description && drug.description.toLowerCase().includes(value)
          );
        });
 
        setResults(results)
      });
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    fetchData(value);
  };


  return (

<div className={HeadStyles.searchContainer}>
          <h1
            style={{
              lineHeight: "0.2",
              letterSpacing: "2px",
              fontFamily: "fantasy",
            }}
          >
            Pharmacy Inventory
          </h1>
          <div className={HomeStyles.searchbar}>
            <FaSearch id="search-icon" />
            <input
              type="text"
              className={HomeStyles.inputBar}
              value={searchTerm}
              placeholder="Search drug....."
              name="search"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>
    )
}

export default SearchBar
import React, { useState } from "react";
import Searcher from "./Searcher.jsx";
import FilterList from "./FilterList.jsx";

import "../css/header.css";

import pokeball from "../media/images/pokeball.png";
import pokedex from "../media/images/pokedex_text.png";

function Header(props) {
  const [criterias, setCriterias] = useState([]);

  function handleNewCriteriaAdded(criteria) {
    let _criterias = criterias.slice();
    _criterias.push(criteria);
    setCriterias(_criterias);
  }

  function handleCloseCriteriaClick(index) {
    let _criterias = criterias.slice();
    _criterias.splice(index, 1);
    setCriterias(_criterias);
  }

  return (
    <header>
      <div className="logo-name">
        <div className="logo">
          <img src={pokeball} alt="Pokeball" />
        </div>
        <div className="name">
          <img src={pokedex} alt="Pokedex text" />
        </div>
      </div>
      <Searcher
        onQueryStringChange={(query) => props.onQueryStringChange(query)}
        onNewCriteriaAdded={handleNewCriteriaAdded}
      ></Searcher>
      <FilterList
        criterias={criterias}
        onCloseCriteriaClick={handleCloseCriteriaClick}
      ></FilterList>
    </header>
  );
}
export default Header;

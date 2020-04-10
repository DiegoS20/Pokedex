import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

function Classifier(props) {
  /* states */
  const [filterValueDisabled, setFilterValueDisabled] = useState(true);
  const [criteria, setCriteria] = useState({ filter: "", value: "" });

  /* handle functions */
  function handleSelectChange(e) {
    setCriteria({
      filter: e.target.value,
      value: criteria.value,
    });

    if (filterValueDisabled) setFilterValueDisabled(false);
  }

  function handleInputChange(e) {
    setCriteria({
      filter: criteria.filter,
      value: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetCriteriaSelector();
  }

  function handleIconClick(e) {
    resetCriteriaSelector();
  }

  /* functions */
  function resetCriteriaSelector() {
    if (filterValueDisabled) return;
    props.onNewCriteriaAdded(criteria);
    setFilterValueDisabled(true);
    setCriteria({ filter: "", value: "" });
    const select = document.getElementById("filter");
    select.selectedIndex = 0;
  }

  return (
    <div className="classifier">
      <span className="text">Add a filter:</span>
      <form onSubmit={handleSubmit}>
        <select
          name="filter"
          id="filter"
          className="filter"
          onChange={handleSelectChange}
        >
          <option>Select a filter</option>
          <option value="type">Types</option>
        </select>
        <input
          type="text"
          className="filter-value"
          id="filterValue"
          disabled={filterValueDisabled}
          placeholder="Write the criteria value"
          value={criteria.value}
          onChange={handleInputChange}
        />
      </form>
      <div
        className="icon_add"
        style={{ color: "white" }}
        onClick={handleIconClick}
      >
        <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
      </div>
    </div>
  );
}
export default Classifier;

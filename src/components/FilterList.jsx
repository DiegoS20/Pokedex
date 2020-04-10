import React from "react";
import FilterCriteria from "./FilterCriteria.jsx";

function FilterList(props) {
  const criterias = props.criterias;
  return (
    <div className="filter-list">
      <div className="list">
        {criterias.map((data, i) => (
          <FilterCriteria
            name={`${data.filter}: ${data.value}`}
            onCloseCriteriaClick={() => props.onCloseCriteriaClick(i)}
            key={i}
          ></FilterCriteria>
        ))}
      </div>
    </div>
  );
}
export default FilterList;

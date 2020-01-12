import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters } from "react-data-grid-addons";


import "./styles.css";
import {data} from "./data";

const defaultColumnProperties = {
  filterable: true,
  resizable: true,
  width: 160
};

const selectors = Data.Selectors;
const {
  NumericFilter,
  AutoCompleteFilter,
  MultiSelectFilter,
  SingleSelectFilter
} = Filters;
const columns = [
  {
    key: "target",
    name: "Target",
    // filterRenderer: AutoCompleteFilter
  },
  {
    key: "commonName",
    name: "Common name",
    filterRenderer: AutoCompleteFilter
  },
  {
    key: "uniprotId",
    name: "Uniprot ID",
    filterRenderer: AutoCompleteFilter
  },
  {
    key: "chEmblId",
    name: "ChEMBL ID",
    filterRenderer: AutoCompleteFilter
  },
  // {
  //   key: "Target Class",
  //   name: "targetClass",
  //   // filterRenderer: AutoCompleteFilter
  // },
  {
    key: "probabilityOfActivity",
    name: "Probability of activity",
    // filterRenderer: NumericFilter
  },
  {
    key: "probability",
    name: "Probability*",
    // filterRenderer: NumericFilter
  },
  {
    key: "knownActives",
    name: "Known actives (3D/2D)",
    filterRenderer: SingleSelectFilter
  },
  {
    key: "db",
    name: "DB",
    filterRenderer: SingleSelectFilter
  },
  {
    key: "pdb",
    name: "PDB",
    filterRenderer: SingleSelectFilter
  },
  {
    key: "compound",
    name: "Compound",
    filterRenderer: SingleSelectFilter
  },
  {
    key: "compoundSmiles",
    name: "Compound SMILES",
    filterRenderer: SingleSelectFilter
  },
  {
    key: "value",
    name: "Value (Chemprot)",
    // filterRenderer: NumericFilter
  },
].map(c => ({ ...c, ...defaultColumnProperties }));

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getValidFilterValues(rows, columnId) {
  return rows
    .map(r => r[columnId])
    .filter((item, i, a) => {
      return i === a.indexOf(item);
    });
}

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

function Example({ rows }) {
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => filteredRows[i]}
      rowsCount={filteredRows.length}
      minHeight={500}
      toolbar={<Toolbar enableFilter={true} />}
      onAddFilter={filter => setFilters(handleFilterChange(filter))}
      onClearFilters={() => setFilters({})}
      getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example rows={data} />, rootElement);

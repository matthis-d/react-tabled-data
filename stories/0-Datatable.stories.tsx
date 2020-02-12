import React from "react";
import { Table, Datatable, Column } from "@";

export default {
  title: "Datatable"
};

const data = [
  { name: "Doe", firstName: "John" },
  { name: "Doe", firstName: "Jane" },
  { name: "Dupont", firstName: "Michel" },
  { name: "Dupont", firstName: "Jean" }
];

export const simpleDatatable = () => (
  <Datatable data={data}>
    <Table>
      <Column
        renderHeader={() => "Name"}
        renderValue={element => element.name}
      />
      <Column
        renderHeader={() => "First Name"}
        renderValue={element => element.firstName}
      />
    </Table>
  </Datatable>
);

simpleDatatable.story = {
  name: "Simple table"
};

export const styledDatatable = () => (
  <Datatable data={data}>
    <Table style={{ width: "100% " }}>
      <Column
        renderHeader={() => "Name"}
        renderValue={element => element.name}
      />
      <Column
        renderHeader={() => "First Name"}
        renderValue={element => element.firstName}
      />
    </Table>
  </Datatable>
);

styledDatatable.story = {
  name: "Styled table"
};

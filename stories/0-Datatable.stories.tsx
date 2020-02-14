import React from "react";
import { Table, Datatable, Column, Row, Header, Body } from "@";

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
      <Header>
        <Row>
          <Column>{() => "Name"}</Column>
          <Column>{() => "First Name"}</Column>
        </Row>
      </Header>
      <Body>
        <Row>
          <Column>{element => element.name}</Column>
          <Column>{element => element.firstName}</Column>
        </Row>
      </Body>
    </Table>
  </Datatable>
);

simpleDatatable.story = {
  name: "Simple table"
};

export const styledDatatable = () => (
  <Datatable data={data}>
    <Table style={{ width: "100%" }}>
      <Header>
        <Row>
          <Column>{() => "Name"}</Column>
          <Column>{() => "First Name"}</Column>
        </Row>
      </Header>
      <Body>
        <Row>
          <Column>{element => element.name}</Column>
          <Column>{element => element.firstName}</Column>
        </Row>
      </Body>
    </Table>
  </Datatable>
);

styledDatatable.story = {
  name: "Styled table"
};

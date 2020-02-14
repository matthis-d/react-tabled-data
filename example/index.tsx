import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Table, Datatable, Column, Header, Body, Row } from "../";

const data = [
  { name: "Doe", firstName: "John" },
  { name: "Doe", firstName: "Jane" },
  { name: "Dupont", firstName: "Michel" },
  { name: "Dupont", firstName: "Jean" }
];

const App = () => {
  return (
    <div>
      <Datatable data={data}>
        <Table>
          <Header>
            <Row>
              <Column>{() => "Hello"}</Column>
            </Row>
          </Header>
          <Body>
            <Row>
              <Column>{element => element?.name}</Column>
              <Column>{element => element?.firstName}</Column>
            </Row>
          </Body>
        </Table>
      </Datatable>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import {
  Table,
  Datatable,
  Column,
  Row,
  Header,
  Body,
  Pagination,
  PreviousPage,
  NextPage,
  GotoPage
} from "@";

export default {
  title: "Datatable"
};

let data = [
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
          <Column>Name</Column>
          <Column>First Name</Column>
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
          <Column>Name</Column>
          <Column>First Name</Column>
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

export const withCustomComponent = () => (
  <Datatable data={data}>
    <Table>
      <Header>
        <Row>
          <Column>Name</Column>
          <Column>First Name</Column>
        </Row>
      </Header>
      <Body>
        <Row>
          <Column as={<th />}>{element => element.name}</Column>
          <Column>{element => element.firstName}</Column>
        </Row>
      </Body>
    </Table>
  </Datatable>
);

withCustomComponent.story = {
  name: "With custom column component"
};

export const withPagination = () => (
  <Datatable data={data} pageSize={2}>
    <Table>
      <Header>
        <Row>
          <Column>Name</Column>
          <Column>First Name</Column>
        </Row>
      </Header>
      <Body>
        <Row>
          <Column>{element => element.name}</Column>
          <Column>{element => element.firstName}</Column>
        </Row>
      </Body>
    </Table>
    <Pagination />
  </Datatable>
);

withPagination.story = {
  name: "With pagination"
};

export const withManyPages = () => {
  const values = new Array(400).fill(1).map((_, index) => ({
    id: index + 1,
    name: `Name ${index + 1}`,
    firstName: `First Name ${index + 1}`
  }));

  return (
    <Datatable data={values} pageSize={2}>
      <Table>
        <Header>
          <Row>
            <Column>Name</Column>
            <Column>First Name</Column>
          </Row>
        </Header>
        <Body>
          <Row>
            <Column>{element => element.name}</Column>
            <Column>{element => element.firstName}</Column>
          </Row>
        </Body>
      </Table>
      <Pagination />
    </Datatable>
  );
};

withManyPages.story = {
  name: "With pagination (many pages)"
};

export const customPagination = () => {
  type PageButtonProps = {
    pageNumber?: number;
    active?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
  const PageButton = ({ pageNumber, active, onClick }: PageButtonProps) => (
    <button onClick={onClick} disabled={active}>
      Page {pageNumber}
    </button>
  );

  return (
    <Datatable data={data} pageSize={2}>
      <Table>
        <Header>
          <Row>
            <Column>Name</Column>
            <Column>First Name</Column>
          </Row>
        </Header>
        <Body>
          <Row>
            <Column>{element => element.name}</Column>
            <Column>{element => element.firstName}</Column>
          </Row>
        </Body>
      </Table>
      <Pagination>
        <PreviousPage>
          <button>{"<"}</button>
        </PreviousPage>
        <GotoPage>
          <PageButton />
        </GotoPage>
        <NextPage>
          <button>{">"}</button>
        </NextPage>
      </Pagination>
    </Datatable>
  );
};

customPagination.story = {
  name: "Custom pagination"
};

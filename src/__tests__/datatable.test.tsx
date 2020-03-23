import * as React from "react";
import { render, RenderResult, fireEvent } from "@testing-library/react";
import {
  Datatable,
  Column,
  Table,
  Body,
  Header,
  Row,
  Pagination,
  PreviousPage,
  NextPage,
  GotoPage
} from "..";

describe("Datatable", () => {
  it("should render its children", () => {
    const { getByText } = render(
      <Datatable data={[]}>
        <p>Hello Datatable</p>
        <p>This is a second child</p>
      </Datatable>
    );

    expect(getByText("Hello Datatable")).toBeVisible();
    expect(getByText("This is a second child")).toBeVisible();
  });

  describe("Table render", () => {
    type DataType = { name: string; firstName: string };

    let data: DataType[];
    let output: RenderResult;

    beforeEach(() => {
      data = [
        { name: "Doe", firstName: "John" },
        { name: "Doe", firstName: "Jane" },
        { name: "Dupont", firstName: "Michel" },
        { name: "Dupont", firstName: "Jean" }
      ];
    });

    describe("nominal case", () => {
      beforeEach(() => {
        output = render(
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
                  <Column>{(element?: DataType) => element?.name}</Column>
                  <Column>{(element?: DataType) => element?.firstName}</Column>
                </Row>
              </Body>
            </Table>
          </Datatable>
        );
      });

      it("should be able to render a table", () => {
        const { container } = output;
        expect(container.getElementsByTagName("table")).toHaveLength(1);
        expect(container.getElementsByTagName("thead")).toHaveLength(1);
        expect(container.getElementsByTagName("tbody")).toHaveLength(1);
      });

      it("should display configured headers", () => {
        const { getByText } = output;
        expect(getByText("Name")).toBeVisible();
        expect(getByText("First Name")).toBeVisible();
      });

      it("should display values according to values to render in each column", () => {
        const { queryAllByText } = output;
        expect(queryAllByText("Doe")).toHaveLength(2);
        expect(queryAllByText("Dupont")).toHaveLength(2);
      });
    });

    it("should be possible not to render a header on columns", () => {
      const { queryAllByText } = render(
        <Datatable data={data}>
          <Table>
            <Body>
              <Row>
                <Column>{(element?: DataType) => element?.name}</Column>
                <Column>{(element?: DataType) => element?.firstName}</Column>
              </Row>
            </Body>
          </Table>
        </Datatable>
      );

      expect(queryAllByText("Doe")).toHaveLength(2);
      expect(queryAllByText("Dupont")).toHaveLength(2);
    });

    it("should be possible not to render a header on a column", () => {
      const { queryAllByText, container } = render(
        <Datatable data={data}>
          <Table>
            <Header>
              <Row>
                <Column>{() => null}</Column>
                <Column>{() => "First Name"}</Column>
              </Row>
            </Header>
            <Body>
              <Row>
                <Column>{(element?: DataType) => element?.name}</Column>
                <Column>{(element?: DataType) => element?.firstName}</Column>
              </Row>
            </Body>
          </Table>
        </Datatable>
      );

      expect(container.getElementsByTagName("th")).toHaveLength(2);
      expect(queryAllByText("Doe")).toHaveLength(2);
      expect(queryAllByText("Dupont")).toHaveLength(2);
    });

    it("should be allowed to have a column with a static child", () => {
      const { queryAllByText, container } = render(
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
                <Column>{(element?: DataType) => element?.name}</Column>
                <Column>{(element?: DataType) => element?.firstName}</Column>
              </Row>
            </Body>
          </Table>
        </Datatable>
      );

      expect(container.getElementsByTagName("th")).toHaveLength(2);
      expect(queryAllByText("Name")).toHaveLength(1);
      expect(queryAllByText("First Name")).toHaveLength(1);
    });

    it("should be possible to change default component for a column", () => {
      const { container } = render(
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
                <Column as={<th />}>
                  {(element?: DataType) => element?.name}
                </Column>
                <Column>{(element?: DataType) => element?.firstName}</Column>
              </Row>
            </Body>
          </Table>
        </Datatable>
      );

      expect(container.getElementsByTagName("th")).toHaveLength(6);
    });

    it("should be possible to add some attributes to the column", () => {
      const { container } = render(
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
                <Column className="some-class">
                  {(element?: DataType) => element?.name}
                </Column>
                <Column>{(element?: DataType) => element?.firstName}</Column>
              </Row>
            </Body>
          </Table>
        </Datatable>
      );

      expect(container.getElementsByClassName("some-class")).toHaveLength(4);
    });

    it("should be possible to add some attributes to an header", () => {
      const { container } = render(
        <Datatable data={data}>
          <Table>
            <Header className="some-class">
              <Row>
                <Column>Name</Column>
                <Column>First Name</Column>
              </Row>
            </Header>
            <Body>
              <Row>
                <Column>{(element?: DataType) => element?.name}</Column>
                <Column>{(element?: DataType) => element?.firstName}</Column>
              </Row>
            </Body>
          </Table>
        </Datatable>
      );

      expect(container.getElementsByClassName("some-class")).toHaveLength(1);
    });

    it("should be possible to add some attributes to a body", () => {
      const { container } = render(
        <Datatable data={data}>
          <Table>
            <Header>
              <Row>
                <Column>Name</Column>
                <Column>First Name</Column>
              </Row>
            </Header>
            <Body className="some-class">
              <Row>
                <Column>{(element?: DataType) => element?.name}</Column>
                <Column>{(element?: DataType) => element?.firstName}</Column>
              </Row>
            </Body>
          </Table>
        </Datatable>
      );

      expect(container.getElementsByClassName("some-class")).toHaveLength(1);
    });

    it("should be possible to add some attributes to a row", () => {
      const { container } = render(
        <Datatable data={data}>
          <Table>
            <Header>
              <Row>
                <Column>Name</Column>
                <Column>First Name</Column>
              </Row>
            </Header>
            <Body>
              <Row className="some-class">
                <Column>{(element?: DataType) => element?.name}</Column>
                <Column>{(element?: DataType) => element?.firstName}</Column>
              </Row>
            </Body>
          </Table>
        </Datatable>
      );

      expect(container.getElementsByClassName("some-class")).toHaveLength(4);
    });

    describe("Pagination", () => {
      type IdObject = { id: number };
      let ids: IdObject[];
      beforeEach(() => {
        ids = new Array(800).fill(1).map((_, index) => ({
          id: index + 1
        }));
      });

      it("should display pageSize elements when given", () => {
        const pageSize = 2;

        const { container } = render(
          <Datatable data={data} pageSize={pageSize}>
            <Table>
              <Body>
                <Row>
                  <Column>{(element?: DataType) => element?.name}</Column>
                  <Column>{(element?: DataType) => element?.firstName}</Column>
                </Row>
              </Body>
            </Table>
          </Datatable>
        );

        expect(container.getElementsByTagName("tr")).toHaveLength(pageSize);
      });

      it("should update displayed elements when navigating in pages", () => {
        const { getByTitle, queryAllByText } = render(
          <Datatable data={data} pageSize={2}>
            <Table>
              <Body>
                <Row>
                  <Column>{(element?: DataType) => element?.name}</Column>
                  <Column>{(element?: DataType) => element?.firstName}</Column>
                </Row>
              </Body>
            </Table>
            <Pagination />
          </Datatable>
        );

        expect(queryAllByText("Doe")).toHaveLength(2);
        expect(queryAllByText("Dupont")).toHaveLength(0);

        fireEvent.click(getByTitle("Go to page 2"));

        expect(queryAllByText("Doe")).toHaveLength(0);
        expect(queryAllByText("Dupont")).toHaveLength(2);
      });

      it("should display a limited number of pages", () => {
        const { queryAllByTitle } = render(
          <Datatable data={ids} pageSize={2}>
            <Pagination displayedPages={5} />
          </Datatable>
        );

        expect(queryAllByTitle(/Go to page/)).toHaveLength(5);
      });

      it("should display a limited number of 10 pages by default", () => {
        const { queryAllByTitle } = render(
          <Datatable data={ids} pageSize={2}>
            <Pagination />
          </Datatable>
        );

        expect(queryAllByTitle(/Go to page/)).toHaveLength(10);
      });

      it("should display current page in the middle, first and last page", () => {
        const { getByTitle, queryAllByTitle } = render(
          <Datatable data={ids} pageSize={2} initialPage={200}>
            <Pagination />
          </Datatable>
        );

        [1, 197, 198, 199, 200, 201, 202, 203, 204, 400].forEach(page => {
          expect(getByTitle(`Go to page ${page}`)).toBeVisible();
        });
        expect(queryAllByTitle(/Go to page/)).toHaveLength(10);
      });

      it("should display first pages when current page is close to them, first and last page", () => {
        const { getByTitle, queryAllByTitle } = render(
          <Datatable data={ids} pageSize={2} initialPage={4}>
            <Pagination />
          </Datatable>
        );

        [1, 2, 3, 4, 5, 6, 7, 8, 9, 400].forEach(page => {
          expect(getByTitle(`Go to page ${page}`)).toBeVisible();
        });
        expect(queryAllByTitle(/Go to page/)).toHaveLength(10);
      });

      it("should display last pages when current page is close to them, first and last page", () => {
        const { getByTitle, queryAllByTitle } = render(
          <Datatable data={ids} pageSize={2} initialPage={398}>
            <Pagination />
          </Datatable>
        );

        [1, 392, 393, 394, 395, 396, 397, 398, 399, 400].forEach(page => {
          expect(getByTitle(`Go to page ${page}`)).toBeVisible();
        });
        expect(queryAllByTitle(/Go to page/)).toHaveLength(10);
      });

      it("should handle custom child components", () => {
        const PageButton = ({ onClick, pageNumber, active }: any) => (
          <button onClick={onClick} className={active ? "active" : ""}>
            Go to page {pageNumber}
          </button>
        );

        const { queryByText } = render(
          <Datatable data={ids} pageSize={2} initialPage={3}>
            <Pagination>
              <div>Pagination's child</div>
              <PreviousPage>
                <button>{"<"}</button>
              </PreviousPage>
              <NextPage>
                <button>{">"}</button>
              </NextPage>
              <GotoPage>
                <PageButton />
              </GotoPage>
            </Pagination>
          </Datatable>
        );

        expect(queryByText("Pagination's child")).toBeVisible();

        [1, 2, 3, 4, 5, 5, 7, 8, 9, 400].forEach(page => {
          expect(queryByText(`Go to page ${page}`)).toBeVisible();
        });
        expect(queryByText("<")).toBeVisible();
        expect(queryByText(">")).toBeVisible();
        expect(queryByText("Go to page 4")).toHaveClass("active");
      });

      it("should handle navigation from custom child components", () => {
        const PageButton = ({ onClick, pageNumber, active }: any) => (
          <button onClick={onClick} className={active ? "active" : ""}>
            Go to page {pageNumber}
          </button>
        );

        const { getByText } = render(
          <Datatable data={ids} pageSize={2} initialPage={3}>
            <Pagination>
              <div>Pagination's child</div>
              <PreviousPage>
                <button>{"<"}</button>
              </PreviousPage>
              <NextPage>
                <button>{">"}</button>
              </NextPage>
              <GotoPage>
                <PageButton />
              </GotoPage>
            </Pagination>
          </Datatable>
        );

        fireEvent.click(getByText("Go to page 2"));
        expect(getByText("Go to page 2")).toHaveClass("active");

        fireEvent.click(getByText("<"));
        expect(getByText("Go to page 1")).toHaveClass("active");

        fireEvent.click(getByText(">"));
        expect(getByText("Go to page 2")).toHaveClass("active");
      });

      it("should use custom component as a wrapper when provided", () => {
        const { container } = render(
          <Datatable data={ids} pageSize={2} initialPage={398}>
            <Pagination component={<nav />} />
          </Datatable>
        );

        expect(container.getElementsByTagName("nav")).toHaveLength(1);
      });

      it("should display ", () => {
        const { container } = render(
          <Datatable data={ids} pageSize={2} initialPage={398}>
            <Pagination component={<nav />} />
          </Datatable>
        );

        expect(container.getElementsByTagName("nav")).toHaveLength(1);
      });
    });
  });
});

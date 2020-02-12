import * as React from "react";
import { render, RenderResult } from "@testing-library/react";
import { Datatable, Column, Table } from "..";

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
              <Column
                renderHeader={() => "Name"}
                renderValue={(element?: DataType) => element?.name}
              />
              <Column
                renderHeader={() => "First Name"}
                renderValue={(element?: DataType) => element?.firstName}
              />
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
            <Column renderValue={(element?: DataType) => element?.name} />
            <Column renderValue={(element?: DataType) => element?.firstName} />
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
            <Column renderValue={(element?: DataType) => element?.name} />
            <Column
              renderHeader={() => "First Name"}
              renderValue={(element?: DataType) => element?.firstName}
            />
          </Table>
        </Datatable>
      );

      expect(container.getElementsByTagName("th")).toHaveLength(2);
      expect(queryAllByText("Doe")).toHaveLength(2);
      expect(queryAllByText("Dupont")).toHaveLength(2);
    });
  });
});

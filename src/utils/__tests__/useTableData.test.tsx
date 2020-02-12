import * as React from "react";
import { render } from "@testing-library/react";
import { useTableData } from "../useTableData";
import { Datatable } from "../../Datatable";

describe("useTableData", () => {
  const FakeComponent = () => {
    const data = useTableData();
    return <div>{JSON.stringify(data)}</div>;
  };

  it("should throw an error when used outside the datatable component", () => {
    const consoleMock = jest.spyOn(console, "error").mockImplementation();
    expect(() => render(<FakeComponent />)).toThrowError();
    consoleMock.mockReset();
  });

  it("should return data given in datatable component", () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const { getByText } = render(
      <Datatable data={data}>
        <FakeComponent />
      </Datatable>
    );
    expect(getByText(JSON.stringify(data))).toBeVisible();
  });
});

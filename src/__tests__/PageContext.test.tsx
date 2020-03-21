import * as React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Datatable } from "../Datatable";
import { usePage } from "../contexts/PageContext";

describe("usePage", () => {
  const FakeComponent = () => {
    const { page, goTo, previousPage, nextPage } = usePage();

    return (
      <>
        <button onClick={previousPage}>Previous</button>
        <button onClick={() => goTo(3)}>Go to</button>
        <button onClick={nextPage}>Next</button>
        <span>Page {page}</span>
      </>
    );
  };

  it("should throw an error when it is not used inside a Datatable", () => {
    const consoleMock = jest.spyOn(console, "error").mockImplementation();
    expect(() => render(<FakeComponent />)).toThrowError();
    consoleMock.mockReset();
  });

  it("should indicate current page", () => {
    const data = new Array(10).map((_, index) => ({ id: index + 1 }));
    const { getByText } = render(
      <Datatable pageSize={2} data={data}>
        <FakeComponent />
      </Datatable>
    );

    expect(getByText("Page 0")).toBeVisible();
  });

  it("should handle goTo page navigation", () => {
    const data = new Array(10).map((_, index) => ({ id: index + 1 }));
    const { getByText } = render(
      <Datatable pageSize={2} data={data}>
        <FakeComponent />
      </Datatable>
    );

    fireEvent.click(getByText("Go to"));
    expect(getByText("Page 3")).toBeVisible();
  });

  it("should handle nextPage navigation", () => {
    const data = new Array(10).map((_, index) => ({ id: index + 1 }));
    const { getByText } = render(
      <Datatable pageSize={2} data={data}>
        <FakeComponent />
      </Datatable>
    );

    fireEvent.click(getByText("Next"));
    expect(getByText("Page 1")).toBeVisible();
  });

  it("should handle previousPage navigation", () => {
    const data = new Array(10).map((_, index) => ({ id: index + 1 }));
    const { getByText } = render(
      <Datatable pageSize={2} data={data} initialPage={2}>
        <FakeComponent />
      </Datatable>
    );

    fireEvent.click(getByText("Previous"));
    expect(getByText("Page 1")).toBeVisible();
  });
});

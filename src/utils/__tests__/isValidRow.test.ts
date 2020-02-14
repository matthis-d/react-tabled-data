import * as React from "react";
import { isValidRow } from "../isValidRow";
import { Row } from "../../Row";

describe("isValidRow", () => {
  it("should return false if this is not a valid React element", () => {
    const element = Row;
    expect(isValidRow(element)).toBe(false);
  });

  it("should return false when given element is not a Row element", () => {
    const element = React.createElement("div");
    expect(isValidRow(element)).toBe(false);
  });

  it("should return true when given element is a Row element", () => {
    const element = React.createElement(Row);
    expect(isValidRow(element)).toBe(true);
  });
});

import * as React from "react";
import { isValidColumn } from "../isValidColumn";
import { Column } from "../../Column";

describe("isValidColumn", () => {
  it("should return false if this is not a valid React element", () => {
    const element = Column;
    expect(isValidColumn(element)).toBe(false);
  });

  it("should return false when given element is not a Column element", () => {
    const element = React.createElement("div");
    expect(isValidColumn(element)).toBe(false);
  });

  it("should return true when given element is a Column element", () => {
    const element = React.createElement(Column);
    expect(isValidColumn(element)).toBe(true);
  });
});

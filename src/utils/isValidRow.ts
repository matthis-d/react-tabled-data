import * as React from "react";
import { Row } from "../Row";

export function isValidRow(
  child: React.ReactNode
): child is React.ReactElement {
  return React.isValidElement(child) && child.type === Row;
}

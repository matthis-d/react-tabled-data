import * as React from "react";
import { Column } from "../Column";

export function isValidColumn(
  child: React.ReactNode
): child is React.ReactElement {
  return React.isValidElement(child) && child.type === Column;
}

import * as React from "react";
import { isValidRow } from "./utils/isValidRow";
import TableProps from "./types/TableProps";

export function Header({ children }: TableProps) {
  return (
    <thead>
      {React.Children.map(children, child => {
        return isValidRow(child)
          ? React.cloneElement(child, { isHeader: true })
          : child;
      })}
    </thead>
  );
}

import * as React from "react";
import { isValidColumn } from "./utils/isValidColumn";
import TableProps from "./types/TableProps";

export function Header({ children }: TableProps) {
  return (
    <thead>
      <tr>
        {React.Children.map(children, child => {
          return isValidColumn(child)
            ? React.cloneElement(child, { isHeader: true })
            : null;
        })}
      </tr>
    </thead>
  );
}

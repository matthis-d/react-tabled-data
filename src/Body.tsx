import * as React from "react";
import TableProps from "./types/TableProps";
import { isValidRow } from "./utils/isValidRow";
import { useTableData } from "./utils/useTableData";

export function Body({ children }: TableProps) {
  const data = useTableData();

  return (
    <tbody>
      {React.Children.map(children, child =>
        isValidRow(child)
          ? data.map(element => React.cloneElement(child, { element }))
          : child
      )}
    </tbody>
  );
}

import * as React from "react";
import TableProps from "./types/TableProps";
import { isValidColumn } from "./utils/isValidColumn";
import { useTableData } from "./utils/useTableData";

export function Body({ children }: TableProps) {
  const data = useTableData();

  return (
    <tbody>
      {data.map(element => (
        <tr key={JSON.stringify(element)}>
          {React.Children.map(children, child => {
            return isValidColumn(child)
              ? React.cloneElement(child, { element })
              : null;
          })}
        </tr>
      ))}
    </tbody>
  );
}

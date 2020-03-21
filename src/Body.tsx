import * as React from "react";
import { isValidRow } from "./utils/isValidRow";
import { useTableData } from "./contexts/TableContext";

type BodyProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableSectionElement>;

export function Body({ children, ...otherProps }: BodyProps) {
  const data = useTableData();

  return (
    <tbody {...otherProps}>
      {React.Children.map(children, child =>
        isValidRow(child)
          ? data.map(element => React.cloneElement(child, { element }))
          : child
      )}
    </tbody>
  );
}

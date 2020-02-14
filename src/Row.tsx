import * as React from "react";
import { isValidColumn } from "./utils/isValidColumn";

type RowProps = {
  children: React.ReactNode;
  isHeader?: boolean;
  element?: any;
} & React.HTMLAttributes<HTMLTableRowElement>;

export function Row({ children, isHeader, element, ...otherProps }: RowProps) {
  return (
    <tr {...otherProps}>
      {React.Children.map(children, child =>
        isValidColumn(child)
          ? React.cloneElement(child, { isHeader, element })
          : child
      )}
    </tr>
  );
}

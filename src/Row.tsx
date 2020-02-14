import * as React from "react";
import { isValidColumn } from "./utils/isValidColumn";

type RowProps = {
  children: React.ReactNode;
  isHeader?: boolean;
  element?: any;
};

export function Row({ children, isHeader, element }: RowProps) {
  return (
    <tr>
      {React.Children.map(children, child =>
        isValidColumn(child)
          ? React.cloneElement(child, { isHeader, element })
          : child
      )}
    </tr>
  );
}

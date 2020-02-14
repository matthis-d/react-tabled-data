import * as React from "react";

type ColumnProps<T> = {
  isHeader?: boolean;
  element?: T;
  children: (element?: T) => React.ReactNode;
};

export function Column<T>({ children, isHeader, element }: ColumnProps<T>) {
  return isHeader ? <th>{children()}</th> : <td>{children(element)}</td>;
}

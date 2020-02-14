import * as React from "react";

type RenderChild<T> = (element?: T) => React.ReactNode;

type ColumnProps<T> = {
  isHeader?: boolean;
  element?: T;
  children: React.ReactNode | RenderChild<T>;
};

export function Column<T>({ children, isHeader, element }: ColumnProps<T>) {
  if (typeof children === "function") {
    return isHeader ? <th>{children()}</th> : <td>{children(element)}</td>;
  }

  return isHeader ? <th>{children}</th> : <td>{children}</td>;
}

import * as React from "react";

type ColumnProps<T> = {
  renderHeader?: () => React.ReactNode;
  renderValue: (element?: T) => React.ReactNode;
  isHeader?: boolean;
  element?: any;
};

export function Column<T>({
  renderHeader,
  renderValue,
  isHeader,
  element
}: ColumnProps<T>) {
  if (isHeader) {
    return renderHeader ? <th>{renderHeader()}</th> : <th />;
  }

  return <td>{renderValue(element)}</td>;
}

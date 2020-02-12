import * as React from "react";
import { TableContext } from "./Datatable";
import TableProps from "./types/TableProps";
import { Header } from "./Header";
import { Body } from "./Body";
import { isValidColumn } from "./utils/isValidColumn";

export function Table({ children, ...tableAttributes }: TableProps) {
  const data = React.useContext(TableContext);

  if (!data) {
    return null;
  }

  const hasHeaderRow = React.Children.map(children, child => {
    if (isValidColumn(child)) {
      return child.props.renderHeader;
    }
    return null;
  }).some(Boolean);

  return (
    <table {...tableAttributes}>
      {hasHeaderRow && <Header>{children}</Header>}
      <Body>{children}</Body>
    </table>
  );
}

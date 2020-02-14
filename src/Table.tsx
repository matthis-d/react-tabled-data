import * as React from "react";
import { TableContext } from "./Datatable";
import TableProps from "./types/TableProps";

export function Table({ children, ...tableAttributes }: TableProps) {
  const data = React.useContext(TableContext);

  if (!data) {
    return null;
  }

  return <table {...tableAttributes}>{children}</table>;
}

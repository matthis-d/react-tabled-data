import * as React from "react";
import TableProps from "./types/TableProps";
import { useTableData } from "./contexts/TableContext";

export function Table({ children, ...tableAttributes }: TableProps) {
  const data = useTableData;

  if (!data) {
    return null;
  }

  return <table {...tableAttributes}>{children}</table>;
}

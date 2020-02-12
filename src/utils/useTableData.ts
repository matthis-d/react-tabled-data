import * as React from "react";
import { TableContext } from "../Datatable";

export function useTableData(): any[] {
  const data = React.useContext(TableContext);
  if (data === undefined) {
    throw new Error("useTableData must be used within a Datatable");
  }

  return data;
}

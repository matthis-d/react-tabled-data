import * as React from "react";

const TableContext = React.createContext<any[] | undefined>(undefined);

export const TableContextProvider = TableContext.Provider;

export function useTableData(): any[] {
  const data = React.useContext(TableContext);

  if (data === undefined) {
    throw new Error("useTableData must be used within a Datatable");
  }

  return data;
}

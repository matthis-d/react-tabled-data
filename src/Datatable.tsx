import * as React from "react";

type DatatableProps<T> = {
  data: T[];
  children: React.ReactNode;
};

export const TableContext = React.createContext<any[] | undefined>(undefined);

export function Datatable<T>({ data, children }: DatatableProps<T>) {
  return <TableContext.Provider value={data}>{children}</TableContext.Provider>;
}

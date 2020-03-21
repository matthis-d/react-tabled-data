import * as React from "react";

const PageSizeContext = React.createContext<number | undefined>(undefined);
export const PageSizeProvider = PageSizeContext.Provider;

export function usePageSize(): number {
  const pageSize = React.useContext(PageSizeContext);
  if (pageSize === undefined) {
    throw new Error("usePageSize must be used within a Datatable");
  }

  return pageSize;
}

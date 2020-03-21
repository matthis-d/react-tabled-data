import * as React from "react";

const TotalLengthContext = React.createContext<number | undefined>(undefined);
export const TotalLengthProvider = TotalLengthContext.Provider;

export function useTotalLength(): number {
  const totalLength = React.useContext(TotalLengthContext);
  if (totalLength === undefined) {
    throw new Error("useTotalLength must be used within a Datatable");
  }

  return totalLength;
}

import * as React from "react";
import { PageAction } from "./types/PageTypes";
import {
  PageStateProvider,
  PageDispatchProvider
} from "./contexts/PageContext";
import { TableContextProvider } from "./contexts/TableContext";
import { PageSizeProvider } from "./contexts/PageSizeContext";
import { TotalLengthProvider } from "./contexts/TotalLengthContext";

type DatatableProps<T> = {
  data: T[];
  pageSize?: number;
  initialPage?: number;
  children: React.ReactNode;
  totalLength?: number;
};

function pageReducer(state: number, action: PageAction): number {
  switch (action.type) {
    case "PAGE_GOTO":
      return action.payload;

    case "PAGE_PREVIOUS":
      return Math.max(0, state - 1);

    case "PAGE_NEXT":
      return state + 1;

    default:
      return state;
  }
}

export function Datatable<T>({
  data,
  pageSize,
  initialPage = 0,
  children,
  totalLength
}: DatatableProps<T>) {
  const [page, dispatchPage] = React.useReducer(pageReducer, initialPage);

  const values = React.useMemo(() => {
    if (pageSize) {
      return data.slice(page * pageSize, (page + 1) * pageSize);
    }

    return data;
  }, [pageSize, data, page]);

  return (
    <TableContextProvider value={values}>
      <PageSizeProvider value={pageSize}>
        <PageStateProvider value={page}>
          <PageDispatchProvider value={dispatchPage}>
            <TotalLengthProvider value={totalLength || data.length}>
              {children}
            </TotalLengthProvider>
          </PageDispatchProvider>
        </PageStateProvider>
      </PageSizeProvider>
    </TableContextProvider>
  );
}

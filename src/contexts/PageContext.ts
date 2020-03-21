import * as React from "react";
import { PageAction } from "../types/PageTypes";
import { usePageSize } from "./PageSizeContext";
import { useTotalLength } from "./TotalLengthContext";

const PageStateContext = React.createContext<number | undefined>(undefined);
const PageDispatchContext = React.createContext<
  React.Dispatch<PageAction> | undefined
>(undefined);

function usePageStateContext(): number {
  const page = React.useContext(PageStateContext);

  if (page === undefined) {
    throw new Error("usePageStateContext must be used within Datatable");
  }

  return page;
}

function usePageDispatchContext(): React.Dispatch<PageAction> {
  const dispatch = React.useContext(PageDispatchContext);

  if (!dispatch) {
    throw new Error("usePageDispatchContext must be used within Datatable");
  }

  return dispatch;
}

export function usePage() {
  const page = usePageStateContext();
  const pageDispatch = usePageDispatchContext();
  const pageSize = usePageSize();
  const totalLength = useTotalLength();

  const pages = React.useMemo(() => {
    if (!pageSize || pageSize <= 0) {
      return [];
    }

    const result = [];
    for (let i = 1; i < totalLength / pageSize + 1; i++) {
      result.push(i);
    }

    return result;
  }, [pageSize, totalLength]);

  return {
    page: page as number,
    goTo: (pageNumber: number) =>
      pageDispatch({ type: "PAGE_GOTO", payload: pageNumber }),
    previousPage: () => pageDispatch({ type: "PAGE_PREVIOUS" }),
    nextPage: () => pageDispatch({ type: "PAGE_NEXT" }),
    pageSize,
    pages
  };
}

export const PageStateProvider = PageStateContext.Provider;
export const PageDispatchProvider = PageDispatchContext.Provider;

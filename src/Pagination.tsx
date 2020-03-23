import * as React from "react";
import { usePage } from "./contexts/PageContext";

type PaginationProps = {
  children?: React.ReactNode;
  className?: string;
  displayedPages?: number;
  component?: React.ReactElement;
};

type PageButtonProps = {
  children?: React.ReactNode;
};

export function PreviousPage({ children }: PageButtonProps) {
  const { previousPage, page } = usePage();

  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement(children, {
    onClick: previousPage,
    disabled: page === 0
  });
}

export function NextPage({ children }: PageButtonProps) {
  const { nextPage, pages, page } = usePage();

  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement(children, {
    onClick: nextPage,
    disabled: page === pages.length - 1
  });
}

export function GotoPage({
  children,
  pageNumber
}: PageButtonProps & { pageNumber?: number }) {
  const { goTo, page } = usePage();

  if (pageNumber === undefined) {
    return null;
  }

  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement(children, {
    onClick: () => goTo(pageNumber - 1),
    active: page === pageNumber - 1,
    pageNumber
  });
}

type GenericPageButtonProps = {
  pageNumber: number;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function GenericPageButton({
  onClick,
  active,
  pageNumber
}: GenericPageButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      title={`Go to page ${pageNumber}`}
    >
      {pageNumber}
    </button>
  );
}

function getPagesToDisplay(
  initialPages: number[],
  displayedPages: number,
  page: number
): number[] {
  if (initialPages.length <= displayedPages) {
    return initialPages;
  }

  const pagesToDisplay = [initialPages[0]];
  const middleCount = displayedPages - 2;
  let beginIndex = Math.max(
    initialPages.indexOf(page + 1) - displayedPages / 2 + 1,
    1
  );

  if (beginIndex + displayedPages > initialPages.length) {
    beginIndex = Math.max(1, initialPages.length - displayedPages + 1);
  }

  pagesToDisplay.push(
    ...initialPages.slice(beginIndex, beginIndex + middleCount)
  );
  pagesToDisplay.push(initialPages[initialPages.length - 1]);

  return pagesToDisplay;
}

export function Pagination({
  children,
  className,
  displayedPages = 10,
  component
}: PaginationProps) {
  const { pageSize, pages, page } = usePage();
  if (!pageSize) {
    return null;
  }

  const pagesToDisplay = getPagesToDisplay(pages, displayedPages, page);

  const getCustomChild = () =>
    React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }
      if (child.type === GotoPage) {
        return pagesToDisplay.map(pageNumber =>
          React.cloneElement(child, { pageNumber })
        );
      }

      return child;
    });

  const getGenericChild = () => (
    <>
      <PreviousPage>
        <button>Previous</button>
      </PreviousPage>
      {pagesToDisplay.map(pageNumber => (
        <GotoPage key={pageNumber} pageNumber={pageNumber}>
          <GenericPageButton pageNumber={pageNumber} />
        </GotoPage>
      ))}
      <NextPage>
        <button>Next</button>
      </NextPage>
    </>
  );

  const paginationChild = children ? getCustomChild() : getGenericChild();

  return React.cloneElement(
    component || <div />,
    { className },
    paginationChild
  );
}

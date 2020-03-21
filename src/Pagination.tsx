import * as React from "react";
import { usePage } from "./contexts/PageContext";

type PaginationProps = {
  children?: React.ReactNode;
  className?: string;
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
}: PageButtonProps & { pageNumber: number }) {
  const { goTo, page } = usePage();

  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement(children, {
    onClick: () => goTo(pageNumber - 1),
    active: page === pageNumber - 1
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

export function Pagination({ children, className }: PaginationProps) {
  const { pageSize, pages } = usePage();
  if (!pageSize) {
    return null;
  }

  if (children) {
    return (
      <div className={className}>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return null;
          }
          if (child.type === GotoPage) {
            return pages.map(pageNumber =>
              React.cloneElement(child, { pageNumber })
            );
          }

          return child;
        })}
      </div>
    );
  }

  return (
    <div className={className}>
      <PreviousPage>
        <button>Previous</button>
      </PreviousPage>
      {pages.map(pageNumber => (
        <GotoPage key={pageNumber} pageNumber={pageNumber}>
          <GenericPageButton pageNumber={pageNumber} />
        </GotoPage>
      ))}
      <NextPage>
        <button>Next</button>
      </NextPage>
    </div>
  );
}

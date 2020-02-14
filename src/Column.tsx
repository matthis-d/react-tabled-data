import * as React from "react";

type RenderChild<T> = (element?: T) => React.ReactNode;

type ColumnProps<T> = {
  isHeader?: boolean;
  element?: T;
  children: React.ReactNode | RenderChild<T>;
  as?: React.ReactElement;
};

export function Column<T>({ children, isHeader, element, as }: ColumnProps<T>) {
  let wrapper = <td />;
  if (isHeader) {
    wrapper = <th />;
  }
  if (as) {
    wrapper = as;
  }

  if (typeof children === "function") {
    return isHeader
      ? React.cloneElement(wrapper, undefined, children())
      : React.cloneElement(wrapper, undefined, children(element));
  }

  return React.cloneElement(wrapper, undefined, children);
}

import * as React from "react";

type RenderChild<T> = (element?: T) => React.ReactNode;

type ColumnProps<T> = {
  isHeader?: boolean;
  element?: T;
  children: React.ReactNode | RenderChild<T>;
  as?: React.ReactElement;
  name?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

export function Column<T>({
  children,
  isHeader,
  element,
  as,
  name,
  ...otherProps
}: ColumnProps<T>) {
  let wrapper = <td />;
  if (isHeader) {
    wrapper = <th />;
  }
  if (as) {
    wrapper = as;
  }

  if (typeof children === "function") {
    return isHeader
      ? React.cloneElement(wrapper, otherProps, children())
      : React.cloneElement(wrapper, otherProps, children(element));
  }

  return React.cloneElement(wrapper, otherProps, children);
}

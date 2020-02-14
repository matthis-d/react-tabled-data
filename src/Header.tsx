import * as React from "react";
import { isValidRow } from "./utils/isValidRow";

type HeaderProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableSectionElement>;

export function Header({ children, ...otherProps }: HeaderProps) {
  return (
    <thead {...otherProps}>
      {React.Children.map(children, child => {
        return isValidRow(child)
          ? React.cloneElement(child, { isHeader: true })
          : child;
      })}
    </thead>
  );
}

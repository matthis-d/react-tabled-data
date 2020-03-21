export type PageAction =
  | { type: "PAGE_GOTO"; payload: number }
  | { type: "PAGE_NEXT" | "PAGE_PREVIOUS" };

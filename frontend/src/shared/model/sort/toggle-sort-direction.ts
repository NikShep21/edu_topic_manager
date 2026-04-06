import type { SortDirection } from "./types";

export const toggleSortDirection = (direction: SortDirection): SortDirection => {
  return direction === "asc" ? "desc" : "asc";
};

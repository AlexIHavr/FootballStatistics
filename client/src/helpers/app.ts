import { FilterByCurrentPageParams } from './../types/helpers';

export const filterByCurrentPage = <T>({
  items,
  currentPage,
  displayCount,
}: FilterByCurrentPageParams<T>): T[] => {
  return items.filter(
    (_, index) => index >= (currentPage - 1) * displayCount && index < currentPage * displayCount
  );
};

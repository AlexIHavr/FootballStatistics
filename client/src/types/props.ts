export type TeamItemProps = {
  id: number;
  name: string;
  shortName: string;
  crestUrl: string;
  tabControl?: React.ReactElement;
};

export type PlayerProps = {
  name: string;
  position: string;
  dateOfBirth: string;
  shirtNumber: number | null;
};

export type TeamPaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsCount: number;
};

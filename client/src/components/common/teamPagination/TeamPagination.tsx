import { Button, ButtonGroup, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCallback, useMemo } from 'react';

import './teamPagination.scss';

type TeamPaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsCount: number;
  displayCount: number;
};

const TeamPagination: React.FC<TeamPaginationProps> = ({
  currentPage,
  setCurrentPage,
  itemsCount,
  displayCount,
}) => {
  const pageCount = useMemo(() => Math.ceil(itemsCount / displayCount), [itemsCount, displayCount]);

  const setCurrentPageOnChange = useCallback(
    (e: SelectChangeEvent<number>) => {
      setCurrentPage(Number(e.target.value));
    },
    [setCurrentPage],
  );

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  return (
    <ButtonGroup variant="text" className="card teamPagination">
      <Button disabled={currentPage === 1} onClick={() => goToPage(1)}>
        first
      </Button>
      <Button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
        prev
      </Button>
      <Select
        value={currentPage}
        onChange={setCurrentPageOnChange}
        size="small"
        className="selectPlayersPage"
      >
        {new Array(pageCount).fill(null).map((_, index) => (
          <MenuItem key={index} value={index + 1}>
            {index + 1}/{pageCount}
          </MenuItem>
        ))}
      </Select>
      <Button disabled={currentPage === pageCount} onClick={() => goToPage(currentPage + 1)}>
        next
      </Button>
      <Button disabled={currentPage === pageCount} onClick={() => goToPage(pageCount)}>
        last
      </Button>
    </ButtonGroup>
  );
};

export default TeamPagination;

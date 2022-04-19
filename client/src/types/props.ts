import { DatesFormNames, TeamFixture } from './../redux/leagueTeam/types';
import { Control, FieldError } from 'react-hook-form';
import { datesFormNames } from '../redux/leagueTeam/constants';

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
  displayCount: number;
};

export type DateFieldProps = {
  fieldValue: keyof typeof datesFormNames;
  control: Control<DatesFormNames>;
  errors: Partial<{
    // eslint-disable-next-line no-unused-vars
    [K in keyof DatesFormNames]: FieldError;
  }>;
};

export type FixtureProps = {
  teamFixture: TeamFixture;
  active?: boolean;
  showFixtureDetails?: boolean;
};

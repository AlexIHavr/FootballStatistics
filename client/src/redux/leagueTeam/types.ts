import { controls, datesFormNames } from './constants';

export type Controls = keyof typeof controls;

export type Team = {
  id: number;
  area: {
    id: number;
    name: string;
  };
  activeCompetitions: {
    id: number;
    area: {
      id: number;
      name: string;
    };
    name: string;
    code: string;
    plan: string;
    lastUpdated: string;
  }[];
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  clubColors: string;
  venue: string;
  squad: {
    id: number;
    name: string;
    position: string;
    dateOfBirth: string;
    countryOfBirth: string;
    nationality: string;
    shirtNumber: null | number;
    role: string;
  }[];
};

export type TeamTweets = {
  username: string;
  created_at: string;
  id: string;
  text: string;
  author_id: string;
}[];

export type DatesFormNames = keyof typeof datesFormNames;

export type DatesFormFields = {
  // eslint-disable-next-line no-unused-vars
  [K in DatesFormNames]: string;
};

export type TeamFixture = {
  id: number;
  utcDate: string;
  score: {
    winner: string;
    duration: string;
    fullTime: {
      homeTeam: number | null;
      awayTeam: number | null;
    };
    halfTime: {
      homeTeam: number | null;
      awayTeam: number | null;
    };
    extraTime: {
      homeTeam: number | null;
      awayTeam: number | null;
    };
    penalties: {
      homeTeam: number | null;
      awayTeam: number | null;
    };
  };
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
};

export type TeamFixtures = TeamFixture[];

export type SetTeamFixturesParams = {
  teamId: string;
  dateFrom: string;
  dateTo: string;
};

export type FixtureDetails = {
  numberOfMatches: number;
  totalGoals: number;
  homeTeam: {
    id: number;
    name: string;
    wins: number;
    draws: number;
    losses: number;
  };
  awayTeam: {
    id: number;
    name: string;
    wins: number;
    draws: number;
    losses: number;
  };
};

export type InitialState = {
  selectedTeam: Team | null;
  selectedControl: Controls;
  teamTweets: TeamTweets;
  teamFixtures: TeamFixtures;
  datesFormFields: DatesFormFields | null;
  fixtureDetails: FixtureDetails | null;
  selectedTeamFixtureLastGames: TeamFixtures;
  selectedTeamFixture: TeamFixture | null;
  teamFixturesError: string | undefined;
  tweetsQuery: string;
};

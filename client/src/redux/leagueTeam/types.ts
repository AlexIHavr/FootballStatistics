import { controls } from './constants';

export type Controls = keyof typeof controls;

export type TeamData = {
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

export type InitialState = {
  selectedTeam: TeamData | null;
  selectedControl: Controls;
  teamTweets: TeamTweets;
  tweetsQuery: string;
};

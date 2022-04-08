import { shortLeagueNamesType } from './../leagueTable/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateType, leagueTeamsDataType } from './types';

const initialState: initialStateType = {
  leagueTeamsData: {
    PL: [
      {
        id: 57,
        area: {
          id: 2072,
          name: 'England',
        },
        name: 'Arsenal FC',
        shortName: 'Arsenal',
        tla: 'ARS',
        crestUrl: 'https://crests.football-data.org/57.png',
        address: '75 Drayton Park London N5 1BU',
        phone: '+44 (020) 76195003',
        website: 'http://www.arsenal.com',
        email: 'info@arsenal.co.uk',
        founded: 1886,
        clubColors: 'Red / White',
        venue: 'Emirates Stadium',
        lastUpdated: '2022-02-10T19:48:56Z',
      },
      {
        id: 58,
        area: {
          id: 2072,
          name: 'England',
        },
        name: 'Aston Villa FC',
        shortName: 'Aston Villa',
        tla: 'AVL',
        crestUrl: 'https://crests.football-data.org/58.png',
        address: 'Villa Park Birmingham B6 6HE',
        phone: '+44 (0121) 3272299',
        website: 'http://www.avfc.co.uk',
        email: null,
        founded: 1872,
        clubColors: 'Claret / Sky Blue',
        venue: 'Villa Park',
        lastUpdated: '2022-04-03T16:22:14Z',
      },
      {
        id: 61,
        area: {
          id: 2072,
          name: 'England',
        },
        name: 'Chelsea FC',
        shortName: 'Chelsea',
        tla: 'CHE',
        crestUrl: 'https://crests.football-data.org/61.png',
        address: 'Fulham Road London SW6 1HS',
        phone: '+44 (0871) 9841955',
        website: 'http://www.chelseafc.com',
        email: null,
        founded: 1905,
        clubColors: 'Royal Blue / White',
        venue: 'Stamford Bridge',
        lastUpdated: '2022-02-10T19:24:40Z',
      },
      {
        id: 62,
        area: {
          id: 2072,
          name: 'England',
        },
        name: 'Everton FC',
        shortName: 'Everton',
        tla: 'EVE',
        crestUrl: 'https://crests.football-data.org/62.png',
        address: 'Goodison Park Liverpool L4 4EL',
        phone: '+44 (0871) 6631878',
        website: 'http://www.evertonfc.com',
        email: 'everton@evertonfc.com',
        founded: 1878,
        clubColors: 'Blue / White',
        venue: 'Goodison Park',
        lastUpdated: '2022-02-10T19:47:42Z',
      },
      {
        id: 64,
        area: {
          id: 2072,
          name: 'England',
        },
        name: 'Liverpool FC',
        shortName: 'Liverpool',
        tla: 'LIV',
        crestUrl: 'https://crests.football-data.org/64.png',
        address: 'Anfield Road Liverpool L4 0TH',
        phone: '+44 (0844) 4993000',
        website: 'http://www.liverpoolfc.tv',
        email: 'customercontact@liverpoolfc.tv',
        founded: 1892,
        clubColors: 'Red / White',
        venue: 'Anfield',
        lastUpdated: '2022-02-10T19:30:22Z',
      },
    ],
    BL1: [
      {
        id: 1,
        area: {
          id: 2088,
          name: 'Germany',
        },
        name: '1. FC Köln',
        shortName: '1. FC Köln',
        tla: 'KOE',
        crestUrl: 'https://crests.football-data.org/1.png',
        address: 'Franz-Kremer-Allee 1 Köln 50937',
        phone: '+49 (221) 71616300',
        website: 'http://www.fc-koeln.de',
        email: 'info@fc-koeln.de',
        founded: 1948,
        clubColors: 'Red / White',
        venue: 'RheinEnergieSTADION',
        lastUpdated: '2022-02-25T16:49:46Z',
      },
      {
        id: 2,
        area: {
          id: 2088,
          name: 'Germany',
        },
        name: 'TSG 1899 Hoffenheim',
        shortName: 'Hoffenheim',
        tla: 'TSG',
        crestUrl: 'https://crests.football-data.org/2.png',
        address: 'Horrenberger Straße 58 Zuzenhausen 74939',
        phone: '+49 (07261) 94930',
        website: 'http://www.achtzehn99.de',
        email: 'info@achtzehn99.de',
        founded: 1921,
        clubColors: 'Blue / White',
        venue: 'PreZero Arena',
        lastUpdated: '2022-02-25T16:49:58Z',
      },
    ],
  },
};

export const leagueTeamsSlice = createSlice({
  name: 'leagueTeams',
  initialState,
  reducers: {
    setLeagueTeams: (
      state,
      action: PayloadAction<{ shortName: shortLeagueNamesType; teams: leagueTeamsDataType }>
    ) => {
      state.leagueTeamsData[action.payload.shortName] = action.payload.teams;
    },
  },
});

export const { setLeagueTeams } = leagueTeamsSlice.actions;

export default leagueTeamsSlice.reducer;

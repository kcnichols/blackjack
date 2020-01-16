
import { useState } from 'react';

const initialState = {};

const useTeamsStats = () => {
  const [teamsStats, setTeamsStats] = useState();

  const getTeamData = (data) => {
    console.log("getting team data", data);
  }

  const getTeamsStats = (teams) => {  
      //console.log("teams.a, teams.b", teams.a, teams.a);
      const fetchData = () => {
        const urls = [
          `https://statsapi.web.nhl.com/api/v1/teams/${teams.a.selectedTeam.value}/stats?gameLog&season=${teams.a.selectedSeason.value}`, // team a stats
          `https://statsapi.web.nhl.com/api/v1/teams/${teams.b.selectedTeam.value}/stats?gameLog&season=${teams.b.selectedSeason.value}`, // team b stats
          `https://statsapi.web.nhl.com/api/v1/standings?season=${teams.a.selectedSeason.value}`, // team a standings
          `https://statsapi.web.nhl.com/api/v1/standings?season=${teams.b.selectedSeason.value}` // team b standings
          //`https://statsapi.web.nhl.com/api/v1/teams/${teams.b.selectedTeam.value}/roster?season=${teams.b.selectedSeason.value}`, // team a roster
          //`https://statsapi.web.nhl.com/api/v1/teams/${teams.b.selectedTeam.value}/roster?season=${teams.b.selectedSeason.value}` // team b roster
        ];
  
        const allRequests = urls.map((url) => {
          return fetch(url).then(response => response.json())
        });
        
        return Promise.all(allRequests);
      };

      let matchupObject = {};
      fetchData().then(arrayOfResponses => {
        console.log("team stats array of responses", arrayOfResponses);
        // build a badass object filled with data

        const teamA = teams.a.selectedTeam.label;
        const teamB = teams.b.selectedTeam.label;

        matchupObject = { 
          [teamA] : {
            name : teams.a.selectedTeam.label,
            season : teams.a.selectedSeason.label,
          }, 
          [teamB] : {
            name : teams.b.selectedTeam.label,
            season : teams.b.selectedSeason.label,
          }
        };

        // pull team stats
        matchupObject[teamA].stats = {};
        matchupObject[teamB].stats = {};

        // record
        matchupObject[teamA].stats.record = `${arrayOfResponses[0].stats[0].splits[0].stat.wins}-${arrayOfResponses[0].stats[0].splits[0].stat.losses}-${arrayOfResponses[0].stats[0].splits[0].stat.ot}`
        matchupObject[teamB].stats.record = `${arrayOfResponses[1].stats[0].splits[0].stat.wins}-${arrayOfResponses[1].stats[0].splits[0].stat.losses}-${arrayOfResponses[1].stats[0].splits[0].stat.ot}`
        
        // goals for
        matchupObject[teamA].stats.gpg = `${arrayOfResponses[0].stats[0].splits[0].stat.goalsPerGame}`;
        matchupObject[teamB].stats.gpg = `${arrayOfResponses[1].stats[0].splits[0].stat.goalsPerGame}`;

        // goals against
        matchupObject[teamA].stats.gapg = `${arrayOfResponses[0].stats[0].splits[0].stat.goalsAgainstPerGame}`;
        matchupObject[teamB].stats.gapg = `${arrayOfResponses[1].stats[0].splits[0].stat.goalsAgainstPerGame}`;
        
        // powerplay percentage
        matchupObject[teamA].stats.pp = `${arrayOfResponses[0].stats[0].splits[0].stat.powerPlayPercentage}`;
        matchupObject[teamB].stats.pp = `${arrayOfResponses[1].stats[0].splits[0].stat.powerPlayPercentage}`;
        
        // penalty kill
        matchupObject[teamA].stats.pk = `${arrayOfResponses[0].stats[0].splits[0].stat.penaltyKillPercentage}`;
        matchupObject[teamB].stats.pk = `${arrayOfResponses[1].stats[0].splits[0].stat.penaltyKillPercentage}`;

        // pull team standings
        //matchupObject.a.leagueStandings = `${arrayOfResponses[2].records[0].teamRankings[aIndex]}`; // this is some bs
        //matchupObject.b.leagueStandings = `${arrayOfResponses[3].records[0].teamRankings[bIndex[0]]}`; // ditto

        
        // pull team roster for that season

        setTeamsStats(matchupObject);
      });


    
  };

  return [teamsStats, {getTeamsStats}];
};

export default useTeamsStats;
export { initialState };
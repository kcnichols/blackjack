
import { useState } from 'react';

const initialState = {};

const useTeamsStats = () => {
  const [teamsRoster, setTeamsRoster] = useState();

  const getTeamsRosterData = (data) => {
    console.log("getting team data", data);
  }

  const getTeamsRoster = (teams) => {  
      console.log("teams.a, teams.b", teams.a, teams.a);
      const fetchData = () => {
        const urls = [
          `https://statsapi.web.nhl.com/api/v1/teams/${teams.a.selectedTeam.value}/roster?season=${teams.a.selectedSeason.value}`, // team a roster
          `https://statsapi.web.nhl.com/api/v1/teams/${teams.b.selectedTeam.value}/roster?season=${teams.b.selectedSeason.value}` // team b roster
        ];
  
        const allRequests = urls.map((url) => {
          return fetch(url).then(response => response.json())
        });
        
        return Promise.all(allRequests);
      };

      let rosterObject = {};
      fetchData().then(arrayOfResponses => {
        //console.log("data", arrayOfResponses);
        // build a badass object filled with data
        rosterObject = { 
          "a" : {
            team : teams.a.selectedTeam.label,
            season : teams.a.selectedSeason.label,
          }, 
          "b" : {
            team : teams.b.selectedTeam.label,
            season : teams.b.selectedSeason.label,
          }
        };
        
        // pull team roster for that season

        setTeamsRoster(rosterObject);
      });


    
  };

  return [teamsRoster, {getTeamsRoster}];
};

export default useTeamsStats;
export { initialState };
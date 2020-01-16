
import { useState } from 'react';

const initialState = {};

const usePlayerStats = () => {
  const [playerStats, setPlayersStats] = useState();

  const getPlayerStats= (teams) => {

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

      let playerStatsObject = {};
      fetchData().then(arrayOfResponses => {

        const fetchStats = () => {
          const playerIds = arrayOfResponses.map((response,index)=>{
            const season = teams[Object.keys(teams)[index]].selectedSeason.value;
            return response.roster.map((player)=>{
              return `https://statsapi.web.nhl.com/api/v1/people/${player.person.id}/stats?stats=gameLog&season=${season}`;
            });
          });

          //console.log('playerIds', playerIds);

          let a = [];
          const allRequests = playerIds.map((team)=>{ 
            team.map((player)=>{
              //console.log('player', player);
               a = a.concat(fetch(player).then(response => response.json()));
            });
          });

          //console.log('allRequests', allRequests);

          return Promise.all(allRequests);
        }

        fetchStats().then((res)=>{
          //console.log("res", res);
        });

        setPlayersStats(playerStatsObject);
      });


    
  };

  return [playerStats, {getPlayerStats}];
};

export default usePlayerStats;
export { initialState };
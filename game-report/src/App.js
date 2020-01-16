import React from 'react';
import './App.css';
import Form from './components/form';
import Results from './components/results';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import useTeamsStats from './hooks/teamStats';
import usePlayerStats from './hooks/playerStats';



const RouterForm = withRouter(Form);
const RouterResults = withRouter(Results);
function App(props) {

  const [teamsStats, {getTeamsStats, getRoster} ] = useTeamsStats();

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/results">Results</Link>
          </li>
        </ul>
      </nav>
      <AppContainer className="App">        
        <Switch> 
          <Route path="/results">
            <RouterResults 
              teams={teamsStats}
            />
          </Route>
          <Route path="/">
            <RouterForm 
              cbSubmitClick={(opponents)=>{ 
                //console.log("opponents", opponents);
                getTeamsStats(opponents);
                //getPlayerStats(opponents);
              }}
            />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  align-items : center;
  display : flex;
  flex-direction: column;
  justify-content : center
`;


export default App;

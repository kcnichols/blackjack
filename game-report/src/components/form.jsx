import React from "react";
import PropTypes from "prop-types";
import { colorGrid } from "s2s-themes";
import styled from "styled-components";
import Button from './button';
import Select from './select';
import { getTeamSelectData } from '../utilities/selectTeamData';
import { fromJS } from 'immutable';
import ObjectMerge from 'object-merge';


const teams = getTeamSelectData();
// Need list of all teams for select values

class Form extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      opponents : {
        a : {
          selectedTeam : undefined,
          selectedSeason : undefined,
          seasonsActive : []
        },
        b : {
          selectedTeam : undefined,
          selectedSeason : undefined,
          seasonsActive : []
        }
      }
    };

    this.makeActiveSeasonData = this.makeActiveSeasonData.bind(this); // this doesn't belong here
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.hasRequiredData = this.hasRequiredData.bind(this);
    this.submitForm = this.submitForm.bind(this);

  }
  static propTypes = {
    cbClick : PropTypes.func,
    label : PropTypes.string,
  }

  static defaultProps = {
    cbClick : (opponent) => { console.warn("Default cbClick function")},
    label : "",
  }

  shouldComponentUpdate(nextProps, nextState) {
    //this component does not use state so it does not need to be checked in here
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  hasRequiredData(){
    let returnValue = false;
    
    // TODO maybe this can be less wordy
    if(this.state.opponents.a.selectedTeam && this.state.opponents.a.selectedSeason && this.state.opponents.b.selectedTeam && this.state.opponents.b.selectedSeason){
      returnValue = true;
    }
    return returnValue;
  }

  submitForm(){
    this.props.history.push('/results');
    this.props.cbSubmitClick(this.state.opponents);
  }

  makeActiveSeasonData(team){
    // create call
    const endpoint = `https://statsapi.web.nhl.com/api/v1/teams/${team.value}`

    let activeSeasons = [];
    // make fetch call
    fetch(endpoint)
      .then(res => res.json())
      .then((data) => {
        
        if(data.hasOwnProperty('teams') && data.teams[0] && data.teams[0].hasOwnProperty("firstYearOfPlay")){
          const firstYear = parseInt(data.teams[0].firstYearOfPlay); // data.teams.firstYearOfPlay -- make a number
          
          // get current year do the following until meets current season 
          const currentYear = new Date().getFullYear() ;
            
          let year = firstYear;
          while(year <= currentYear){
            // create select values { "value": "19261927", "label": "1926 - 1927"}
            const season = {}

            // add 1 to it to get next year
            const currYear = year; // todo better name currentYear / currYear
            const nextYear = year+1;
            season.value = `${currYear.toString()}${nextYear.toString()}`; // stringify it
            season.label = `${currYear.toString()} - ${nextYear.toString()}`; // stringify it // concat string ex 19911992 and 1991 - 1992
            activeSeasons.push(season);
            year = year+1;
          }
        }
      })
      .catch(console.log);


      return activeSeasons;
  }

  handleTeamChange(team, field){
    const seasons = this.makeActiveSeasonData(team,field);

    this.setState((prevState)=>{
      const newState = ObjectMerge({}, prevState);
      newState.opponents[field].selectedTeam = team
      newState.opponents[field].seasonsActive = seasons
      return newState;
    });
  }

  handleSeasonChange(season,field){
    this.setState((prevState)=>{
      const newState = ObjectMerge({}, prevState);
      newState.opponents[field].selectedSeason = season
      return newState;
    });
  }

  render() {
    //console.log('props, state', this.props, this.state);

    return (
      <FormContainer className="ButtonContainer" >
        <h1>Game Report</h1>
        <h2>Please pick your opponents</h2>
        <OpponentFields>
          <StyledField name="Opponent 1">
            <Select 
              label="Team"
              options={teams}
              cbChange={(team)=>{ this.handleTeamChange(team, "a"); }}
              value={this.state.opponents.a.selectedTeam}
            />
            <Select 
              label="Season"
              cbChange={(season)=>{this.handleSeasonChange(season, "a");}}
              isDisabled={this.state.opponents.a.selectedTeam === undefined}
              options={this.state.opponents.a.seasonsActive}
              value={this.state.opponents.a.selectedSeason}
              
            />
          </StyledField>
          VS
          <StyledField name="Opponent 2">
            <Select 
              label="Team"
              options={teams}
              cbChange={(team)=>{ this.handleTeamChange(team, "b");}}
              value={this.state.opponents.b.selectedTeam}
            />
            <Select 
              label="Season"
              cbChange={(season)=>{ this.handleSeasonChange(season, "b"); }}
              isDisabled={this.state.opponents.b.selectedTeam === undefined}
              options={this.state.opponents.b.seasonsActive}
              value={this.state.opponents.b.selectedSeason}
            />
          </StyledField>
        </OpponentFields>
        <Button 
          label="View Report"
          cbClick={this.submitForm}
          isDisabled={!this.hasRequiredData()}
        />
      </FormContainer>
    );
  }
}

const FormContainer = styled.div`
  width : 75%;
`

const OpponentFields = styled.div`
  align-items : center;
  display : flex;
  width : 100%;
  margin-bottom : 32px;
`;

const StyledField = styled.fieldset`
  border : 1px solid ${colorGrid.gray5};
  border-radius : 4px;
  width: 100%;
`

export default Form;
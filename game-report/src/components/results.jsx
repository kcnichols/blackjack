import React from "react";
import PropTypes from "prop-types";
import { colorGrid } from "s2s-themes";
import styled from "styled-components";
import { fromJS } from 'immutable';


const ArrowUp = styled.div`
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid ${colorGrid.green5};
`;

const ArrowDown = styled.div`
  width: 0; 
  height: 0; 
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid ${colorGrid.red5};
`;


class Results extends React.Component {
  constructor(props){
    super(props);

    this.state = {};

    this.getStatIndicator = this.getStatIndicator.bind(this); // TODO what do i call this for real though
  }

  static propTypes = {
    matchup : PropTypes.object,
    cbClick : PropTypes.func,
    label : PropTypes.string,
  }

  static defaultProps = {
    matchup : {},
    cbClick : (opponent) => { console.warn("Default cbClick function")},
    label : "",
  }

  shouldComponentUpdate(nextProps, nextState) {
    //this component does not use state so it does not need to be checked in here
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  componentDidMount(){

  }


  getStatIndicator(){

  }


  render() {
    //console.log("this.props, this.state", this.props, this.state);

    const teams = Object.keys(this.props.teams);
    const statHeaders = ["Team", "Record", "Power Play %", "Penalty Kill %", "Goals Per Game", "Goals Allowed Per Game"];

    console.log("teams", this.props.teams);
    return (
      <ResultsContainer className="ButtonContainer" >
        <h1>Results</h1>
        <ResultsGrid>
          {this.props.teams && this.props.teams[teams[0]] && this.props.teams[teams[1]] ? 
            <React.Fragment>
              <GridChild>Team</GridChild>
              <GridChild>{this.props.teams[teams[0]].name} {this.props.teams[teams[0]].season}</GridChild>
              <GridChild>{this.props.teams[teams[1]].name} {this.props.teams[teams[1]].season}</GridChild>
              <GridChild>Record</GridChild>
              <GridChild>{this.props.teams[teams[0]].stats.record} </GridChild>
              <GridChild>{this.props.teams[teams[1]].stats.record}</GridChild>
              <GridChild>Power Play Percentage</GridChild>
              <GridChild>{this.props.teams[teams[0]].stats.pp}</GridChild>
              <GridChild>{this.props.teams[teams[1]].stats.pp}</GridChild>
              <GridChild>Penalty Kill Percentage</GridChild>
              <GridChild>{this.props.teams[teams[0]].stats.pk}</GridChild>
              <GridChild>{this.props.teams[teams[1]].stats.pk}</GridChild>
              <GridChild>Goals Per Game</GridChild>
              <GridChild>{this.props.teams[teams[0]].stats.gpg}</GridChild>
              <GridChild>{this.props.teams[teams[1]].stats.gpg}</GridChild>
              <GridChild>Goals Allowed Per Game</GridChild>
              <GridChild>{this.props.matchup[teams[0]].stats.gapg}</GridChild>
              <GridChild>{this.props.matchup[teams[1]].stats.gapg}</GridChild>
            </React.Fragment>
          : undefined }
        </ResultsGrid>
      </ResultsContainer>
    );
  }
}

const ResultsContainer = styled.div`
  width : 75%;
`

const ResultsGrid = styled.div`
  background-color : ${colorGrid.gray5}
  border : 1px solid ${colorGrid.gray5};
  border-radius : 4px;
  display : grid;
  grid-gap : 1px;
  grid-template-columns : 33.3% 33.2% 33.3%;
  grid-template-rows : 40px 40px 40px 40px 40px 40px;
  //padding : 8px;
`;

const GridChild = styled.div`
  align-items : center;
  background-color : ${colorGrid.gray0};
  display : flex;
  justify-content: flex-start;
  padding-left : 8px;
`;

export default Results;
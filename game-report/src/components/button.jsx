import React from "react";
import PropTypes from "prop-types";
import { colorGrid } from "s2s-themes";
import styled from "styled-components";

// Need list of all teams for select values

class Button extends React.Component {
  static propTypes = {
    cbClick : PropTypes.func,
    isDisabled : PropTypes.bool,
    label : PropTypes.string,
  }

  static defaultProps = {
    cbClick : (opponent) => { console.warn("Default cbClick function")},
    isDisabled : false,
    label : "",

  }

  render() {
    //console.log('props, state', this.props, this.state);

    return (
      <ButtonContainer className="ButtonContainer" disabled={this.props.isDisabled} onClick={this.props.cbClick}>
        <Label>{this.props.label}</Label>
      </ButtonContainer>
    );
  }
}

const ButtonContainer = styled.button`
  align-items : center;
  background-color : ${colorGrid.green7};
  border : 1px solid transparent;
  border-radius : 4px;
  color : ${colorGrid.gray0};
  display : flex;
  flex-direction : column;
  justify-content : center;
  height : 40px;
  width : 100%;

  &:disabled {
    background-color : ${colorGrid.gray2};
    color : ${colorGrid.gray6}
  }
`;

const Label = styled.label`
  font-size : 16px;
  font-weight : 600;
`;

export default Button;

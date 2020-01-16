import React from "react";
import PropTypes from "prop-types";
//import { colorGrid } from "s2s-themes";
import styled from "styled-components";
import ReactSelect from 'react-select';

class Select extends React.Component {
  constructor(props){
    super(props);
    this.displayName = 'Select';
  }

  static propTypes = {
    autoFocus : PropTypes.bool,
    cbChange : PropTypes.func,
    isDisabled : PropTypes.bool,
    label : PropTypes.string,
    options : PropTypes.array,
    value : PropTypes.object
  }

  static defaultProps = {
    autoFocus : false,
    cbChange : (opponent) => { console.warn("Default cbChange function")},
    isDisabled : false,
    label : "",
    options : [],
    placeholder : "",
    value: undefined //{ "value": 14, "label": "Tampa Bay Lightning" }
  }

  static displayName = 'Select';

  render() {
    //console.log('props, state', this.props, this.state);

    return (
      <SelectContainer className="SelectContainer" >
        <Label className="SelectLabel">{this.props.label}</Label>
        <StyledReactSelect
          className="ReactSelect"
          autoFocus={this.props.autoFocus}
          isDisabled={this.props.isDisabled}
          onChange={(option)=>{
            this.props.cbChange(option);
          }}
          options={this.props.options}
          placeholder={this.props.placeholder}
          value={this.props.value}
        />
      </SelectContainer>
    );
  }
}

const SelectContainer = styled.div`
  display : flex;
  flex-direction : column;
  width : 100%;
`;

const Label = styled.label`
  font-weight : 600;
`;

const StyledReactSelect = styled(ReactSelect)`
`;

export default Select;

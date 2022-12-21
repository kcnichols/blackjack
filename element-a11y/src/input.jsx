import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = forwardRef((props, ref) => {


  return (
    <React.Fragment>
        <input type="text" />
    </React.Fragment>
  );
});

Input.propTypes = {

};

Input.defaultProps = {

};


export default Input;
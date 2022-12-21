import React from 'react';
import styled from 'styled-components';

const Button = styled.button`

`;
const StartButton = (props)=>{

    return (
        <Button
            onClick={props.onClick}
        >Start Game</Button>
    );
}

export default StartButton;
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    border: 1px solid #ccc;
    border-radius : 4px;
    height : 150px;
    width : 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
`;

const Suit = styled.div`
    align-self: center;
    display : flex;
    color : ${props => props.suit === "hearts" || props.suit === "diamonds" ? "red": "black"};
    font-size: 48px;

    height: 50px;
    width: 50px;
`;

const CardValueContainer = styled.div`
    align-self : ${props => props.position === "top" ? "flex-start" : "flex-end"};
    color : ${props => props.suit === "hearts" || props.suit === "diamonds" ? "red": "black"}; 
    font-size : 24px;
`;

const CardValue = (props)=>{
    return (
        <CardValueContainer
            value={props.value} 
            suit={props.suit}
            position={props.position}
        >
            {props.value}
            {suitEmojiMap[props.suit]}
        </CardValueContainer>
    )
}

const suitEmojiMap = {
    "diamonds": "♦️",
    "hearts": "♥️",
    "clubs": "♣️",
    "spades": "♠️"
};

const Card = (props)=>{

    // suite
    // value


    return (
        <CardContainer onClick={props.onClick}>
            <CardValue 
                value={props.value} 
                suit={props.suit}
                position={"top"}
            />

            <Suit suit={props.suit}>
                {suitEmojiMap[props.suit]}
            </Suit>
            <CardValue 
                value={props.value} 
                suit={props.suit}
                position={"bottom"}
            />
        </CardContainer>
    );
}

export default Card;
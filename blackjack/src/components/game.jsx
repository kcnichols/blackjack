import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Card from './card';

const Main = styled.main`
    // display: flex;
    // flex-direction: column;
`;


const DealerHand = styled.div`
    display: flex;
    width: 100%;
`;

const PlayerHand = styled(DealerHand)``

const cardSuits = ["clubs", "hearts", "diamonds", "spades"];
const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const deck = [];

cardValues.forEach((value)=>{
    cardSuits.forEach((suit)=>{
        const card = {
            value : value,
            suit : suit
        };
        deck.push(card);
    })

});


const shuffleDeck = deck
.map(value => ({value, sort: Math.random() }))
.sort((a,b)=> a.sort - b.sort)
.map(({value})=> value);

const Game = (props)=>{
    const playerName = useSelector((state)=> state.username.value);
    const [currentDeck, setCurrentDeck ] = useState(shuffleDeck);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [stats, setStats ] = useState([
        {
            "name": playerName,
            "id": 0,
            "hand": [],
            "score": 0
        },
        {
            "name": "Dealer",
            "id": 1,
            "hand": [],
            "score": 0
        },

    ])

    const deal = ()=>{
        console.log('dealing...')

        // create and shuffle deck
        // remove 4 cards (2 dealer 2 player);

        const newStats = stats;
        newStats[0].hand = [].concat(currentDeck[0]).concat(currentDeck[2]);
        newStats[1].hand = [].concat(currentDeck[1]).concat(currentDeck[3]);

        console.log('newStats', stats, newStats)
        setStats(newStats);

        const newDeck = currentDeck.slice(3, currentDeck.length - 1);
        setCurrentDeck(newDeck);
        // end game if dealer has blackjack
        calculateHand(newStats[1].hand);
        calculateHand(newStats[0].hand);
    };

    const hit = ()=>{
        console.log('hit...');
        // give player/dealer a card
        const newStats = stats;
        newStats[currentPlayer].hand = stats[currentPlayer].hand.concat(currentDeck[0]);

        setStats(newStats);


        // end hand if player/dealer busts
        if(calculateHand(stats[currentPlayer].hand) > 21){
            endHand();
        }

        const newDeck = currentDeck.slice(1, currentDeck.length - 1);
        setCurrentDeck(newDeck);
    };

    const stay = () => {
        console.log('player stay...')
        // do not deal any cards
        // if player stays dealer turns over and plays his hand (hit/stay)
        setCurrentPlayer(1)
    };

    const endHand = () =>{
        console.log('end hand', calculateHand(stats[0].hand), calculateHand(stats[1].hand));
    }

    const calculateHand = (hand = [])=>{
        //console.log('hand', hand)
        // Card Values
        // value == value (example : 2 == 2)
        // J | Q | K == 10
        // A == 1 | 11

        //const hasAce = hand.find(card => card.value === "A") != null;
        //console.log('hasAce', hasAce);
        const handValue = hand.reduce((p,c)=>{
            //console.log('p,c', p,c)
                //console.log('c value', c.value);

                if(c.value === "J" || c.value === "Q" || c.value === "K") {
                    return p + 10;
                } else if (c.value === "A") {
                    //console.log('what do for aces???');
                    // if p + 11 <= 21, a === 11 else a === 1
                    if(p + 11 <= 21){
                        //console.log("11")
                        return p + 11;
                    } else { 
                        //console.log("1")
                        return p + 1;
                    }
                } else {
                    return p + parseInt(c.value);
                }
        }, 0);

        return handValue;
    }



    useEffect(()=>{
        deal();
    },[]);

    const getCards = (cards) => {
        return (
            <>
                {cards.map((card)=>{
                    return (
                        <Card
                            key={card.suit + card.value}
                            suit={card.suit}
                            value={card.value}
                        />
                    )
                })}
            </>
        )
    }

    console.log('dealer hand', stats[1].hand, stats[0].hand);
    return (
        <Main>
            <h2>Game</h2>
            <div>
                <div>
                    <h3>Dealer</h3>
                    <div>Total : {calculateHand(stats[1].hand)}</div>
                    <DealerHand>{getCards(stats[1].hand)}</DealerHand>
                    
                    
                </div>
                
                <div>
                    <PlayerHand>{getCards(stats[0].hand)}</PlayerHand>
                    <h3>{playerName}</h3>
                    <div>Total: {calculateHand(stats[0].hand)}</div>
                </div>  
            </div>

            <button onClick={deal}>Deal</button>
            <button onClick={hit}>Hit</button>
            <button onClick={stay}>Stay</button>
        </Main>
    );
}

export default Game;
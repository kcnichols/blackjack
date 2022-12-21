import React, { useState } from 'react';
import styled from 'styled-components';
import UserName from './userName';
import StartButton from './startButton';
import { change } from '../reducers/nameReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// TODO should I move the redux stuff into the Login route????  

const Main = styled.main`
    width : 320px;
`;

const Login = (props)=>{
    const dispatch = useDispatch();
    const name = useSelector((state)=> state.username.value);
    const navigate = useNavigate();

    const setUsername = (event) => {
        const value = event.target.value;
        dispatch(change(value));
     };

     const startGame = () => {
        console.log('starting game with', name, "...");

        // change route
        navigate("/game");
     };

    return (
        <Main>
        <h2>Login</h2>
        <UserName
            username={name}
            onChange={setUsername}
        />
        <StartButton
            onClick={startGame}
        />
        </Main>

    )
}

export default Login;
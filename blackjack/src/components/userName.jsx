import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
    display : flex;
    flex-direction: column;
`;
const Input = styled.input`
`;
const UserName = (props)=>{



    return (
        <Label>
            Enter name :
            <Input 
                value={props.username}
                onChange={props.onChange}
            />
        </Label>
    )
}

export default UserName;
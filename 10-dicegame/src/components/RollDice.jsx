import React, { useState } from 'react'
import styled from 'styled-components';

const RollDice = ({currentDice, rollDice}) => {

    return (
        <DiceContainer>
            <div className='dice' onClick={rollDice}>
                <img src={`/src/assets/dice/dice_${currentDice}.png`} alt="Dice1" />
            </div>
            <p>Click on Date to roll</p>
        </DiceContainer>
    )
}

export default RollDice

const DiceContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 50px;

.dice{
    cursor: pointer;
}

p{
    font-size: 24px;
}
`;
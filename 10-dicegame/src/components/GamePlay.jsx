import React, { useState } from 'react'
import TotalScore from './TotalScore'
import NumberSelector from './NumberSelector'
import styled from 'styled-components';
import RollDice from './RollDice';

const GamePlay = () => {
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [score, setScore] = useState(0);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const rollDice = () => {
    const randomNumber = generateRandomNumber(1, 7);
    setCurrentDice((prev) => randomNumber);

    if (selectedNumber === randomNumber) {
      setScore((prev) => prev + randomNumber);
    } else {
      setScore((prev) => prev - 2);
    }
  }

  return (
    <MainContainer>
      <div className='top-section'>
        <TotalScore score={score} />
        <NumberSelector selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />
      </div>
      <RollDice currentDice={currentDice} rollDice={rollDice} />
    </MainContainer>
  )
}

export default GamePlay

const MainContainer = styled.main`
.top-section{
  display: flex;
  justify-content: space-around;
  align-items: end;
}
`;
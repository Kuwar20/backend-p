import React from 'react'
import TotalScore from './TotalScore'
import NumberSelector from './NumberSelector'
import styled from 'styled-components';

const GamePlay = () => {
  return (
    <MainContainer>
      <div className='top-section'>
          <TotalScore/>
          <NumberSelector/>
      </div>
    </MainContainer>
  )
}

export default GamePlay

const MainContainer = styled.main`
.top-section{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`;
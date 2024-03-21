import React from 'react'
import styled from 'styled-components'
import image1 from '../../src/assets/dices 1.png'

const StartGame = ({toggle}) => {
  return (
    <Container>
      <div>
        <img src={image1} alt="Dice_image" />
      </div>
      <div className='content'>
        <h1>DICE GAME</h1>
        <Button onClick={toggle}>Play Now</Button>
      </div>
    </Container>
  )
}

export default StartGame

const Container = styled.div`
max-width: 1180px;
height: 100vh;
display: flex;
margin: 0 auto;
align-items: center;

.content {
  h1 {
    font-size: 70px;
     white-space: nowrap; /* put the text in one line */
  }
}
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  min-width: 220px;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
    transition: all 0.3s ease;
}
`;
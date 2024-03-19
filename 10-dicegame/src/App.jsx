import './App.css'
import styled from 'styled-components';


function App() {

  return (
    <>
      <Button>Styled button</Button>
    </>
  )
}

export default App

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
`;
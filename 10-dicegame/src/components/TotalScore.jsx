import React from 'react'
import styled from 'styled-components';

const TotalScore = () => {
    return (
        <ScoreContainer>
            <h1>0</h1>
            <p>Total Score</p>
        </ScoreContainer>
    )
}

export default TotalScore

const ScoreContainer = styled.div`
max-width: 100px;
text-align: center;
h1{
    font-size: 80px;
}

p{
    font-size: 24px;
    font-weight: 500px;
}
`;
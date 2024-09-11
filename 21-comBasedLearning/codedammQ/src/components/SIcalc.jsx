import React, { useState } from 'react'

const SIcalc = () => {
    const [principal, setPrincipal] = useState('')
    const [rate, setRate] = useState('')
    const [time, setTime] = useState('')
    const [result, setResult] = useState(null)

    const CalculateSI = (e) => {
        e.preventDefault()
        const SI = (principal * rate * time) / 100
        setResult(SI)
    }


    return (
        <div>
            <h1>Simple Interest Calculator</h1>
            <form onSubmit={CalculateSI}>
                <label>Principal Amount</label>
                <input type="number" 
                    value={principal}
                    min={0}
                    onChange={(e) => setPrincipal(e.target.value)}
                    />
                <br />
                <label>Rate of Interest</label>
                <input type="number" 
                    value={rate}
                    min={0}
                    onChange={(e) => setRate(e.target.value)}
                />
                <br />
                <label>Time (in years)</label>
                <input type="number" 
                    value={time}
                    min={0}
                    onChange={(e) => setTime(e.target.value)}
                />
                <br />
                <button type='submit'>Calculate</button>
            </form>
            {result !== null && <h2>Simple Interest: {result.toFixed(2)}</h2>}
        </div>
    )
}

export default SIcalc
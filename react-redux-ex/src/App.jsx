import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, multiply, incrementByAmount } from './redux/counter/counterSlice'
import Navbar from './components/Navbar'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <>
        <div>
          <Navbar />
          <button onClick={()=>dispatch(increment())}>+ </button> The current count is: {count}
          <button onClick={()=>dispatch(decrement())}> -</button>
        </div>
    </>
  )
}

export default App

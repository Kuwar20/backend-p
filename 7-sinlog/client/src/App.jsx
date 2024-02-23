import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signin from './pages/signup/Signup'
import Headers from './components/header/Header'

function App() {

  return (
    <>
      <BrowserRouter>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signin />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

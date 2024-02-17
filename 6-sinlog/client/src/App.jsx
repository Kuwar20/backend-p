import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import SignIn from './pages/signin/SignIn';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<SignIn />} />
        </Routes> 
      </BrowserRouter>
    </div>
  )
}

export default App

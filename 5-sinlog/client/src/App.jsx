import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Header from './components/Header/Header'
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProtectedRoute Component={Main} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

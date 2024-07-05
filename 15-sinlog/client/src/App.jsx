import {BrowserRouter,Routes, Route} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Login1 from './pages/Login1';

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/login1' element={<Login1/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/search" element={<Search/>} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

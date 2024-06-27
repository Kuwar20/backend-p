import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import NotFound from './Pages/Notfound';
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

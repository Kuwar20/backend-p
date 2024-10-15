import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchSort from './component/SearchSort';
import SearchSort2 from './component/SearchSort2';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/ss" element={<SearchSort />} />
          <Route path='/search' element={<SearchSort2 />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchSort from './component/SearchSort';
import SearchSort2 from './component/SearchSort2';
import SearchSort3 from './component/SearchSort3';
import RsearchSort from './component/RsearchSort';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/ss" element={<SearchSort />} />
          <Route path='/search' element={<SearchSort2 />} />
          <Route path='/search1' element={<SearchSort3 />} />
          <Route path='/search2' element={<RsearchSort/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

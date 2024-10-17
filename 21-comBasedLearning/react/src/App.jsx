import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchSort from './component/SearchSort';
import SearchSort2 from './component/SearchSort2';
import SearchSort3 from './component/SearchSort3';
import RsearchSort from './component/RsearchSort';
import RsearchSort2 from './component/RsearchSort2';
import RsearchSort3 from './component/RsearchSort3';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/ss" element={<SearchSort />} />
          <Route path='/search' element={<SearchSort2 />} />
          <Route path='/search1' element={<SearchSort3 />} />
          <Route path='/search2' element={<RsearchSort/>}/>
          <Route path='/search3' element={<RsearchSort2/>}/>
          <Route path='/search4' element={<RsearchSort3/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

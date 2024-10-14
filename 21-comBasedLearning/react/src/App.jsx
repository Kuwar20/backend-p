import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchSort from './component/SearchSort';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/ss" element={<SearchSort />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

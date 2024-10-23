// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import SearchSortPagination from './components/SearchSortPagination';
import Ssp from './pages/Ssp';
import Ssp2 from './pages/Ssp2';
import Ssp3 from './pages/Ssp3';
import Ssp4 from './pages/Ssp4';
import Ssp5 from './pages/Ssp5';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path='/ssp' element={<SearchSortPagination />} />
          </Route>
          <Route path='/nigga' element={<Ssp />} />
          <Route path='/ssp2' element={<Ssp5 />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
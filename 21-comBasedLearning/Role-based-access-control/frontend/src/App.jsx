// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import SearchSortPagination from './components/SearchSortPagination';
import Feature from './pages/Feature';
import Home from './pages/Home';
import Ssp10 from './pages/Ssp10';
import Localstorage from './pages/Localstorage';
import Navbarlist from './components/Navbarlist';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbarlist />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path='/ssp' element={<SearchSortPagination />} />
          </Route>
          <Route path='/ssp2' element={<Ssp10 />} />
          <Route path='/feature' element={<Feature />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/home" element={<Home />} />
          <Route path="/localstorage" element={<Localstorage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Signin from "./components/Signin";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/signin" element={<Signin />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

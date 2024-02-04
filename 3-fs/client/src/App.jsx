import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Form from "./components/Form";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/signin" element={<Form />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

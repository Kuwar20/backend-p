import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Page1 from "./pages/Page1/Page1";
import Page2 from "./pages/Page2/Page2";
import Page3 from "./pages/Page3/Page3";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/link1" element={<Page1 />} />
          <Route path="/link2" element={<Page2 />} />
          <Route path="/link3" element={<Page3 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

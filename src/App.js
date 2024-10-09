import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import TestConstructor from "./pages/TestConstructor";
import Infotest from "./pages/Infotest";


import "./styles/main.css";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/editor" element={<Editor/>}/>
          <Route path="/editor/constructor" element={<TestConstructor/>}/>
          <Route path="/editor/info_test" element={<Infotest/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;

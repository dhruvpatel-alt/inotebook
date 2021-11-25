import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import NoteState from './Context/notes/NoteState';
function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <div className="container-my3" >
  <Routes>
  <Route exact path="/" element={<Home/>} />
  <Route exact path="/about" element={<About/>} />
        </Routes>
        </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;

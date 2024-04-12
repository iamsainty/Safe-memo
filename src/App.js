import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  document.body.style.background = 'linear-gradient(to right, #222222, #111111)';
  return (
    <div className="App">
      <Router>
        <Navbar />
        <NoteState>
          <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
          </div>
        </NoteState>
      </Router>
    </div>
  );
}

export default App;

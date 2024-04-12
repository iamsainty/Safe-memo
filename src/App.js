import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null);

  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  document.body.style.background = 'linear-gradient(to right, #222222, #111111)';
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <NoteState>
          <div>
          <Routes>
            <Route exact path="/" element={<Home showalert={showalert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showalert={showalert} />} />
            <Route exact path="/register" element={<Register showalert={showalert} />} />
          </Routes>
          </div>
        </NoteState>
      </Router>
    </div>
  );
}

export default App;

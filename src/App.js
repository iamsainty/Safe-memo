import './App.css';
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

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Alert message={"This is alert message"}/>
        <NoteState>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
          </div>
        </NoteState>
      </Router>
    </div>
  );
}

export default App;

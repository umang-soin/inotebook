import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import './App.css';
import NoteState from './components/notes/NoteState';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch
} from "react-router-dom"

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Home/>
     <h1>This is my react app</h1>
      <Routes>
        <Route exact path='/about' element={ <About/>} />
        <Route exact path='/home' element={ <Home/>} />
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;

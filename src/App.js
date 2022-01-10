import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Header from './components/Header'
import Notes from './pages/Notes'
import Note from './pages/Note'
import Footer from "./components/Footer";
function App() {

  return (
    <Router>
      <div className="container">
        <div className="app">
          <Header />
          <Route path="/" exact component={Notes} />
          <Route path="/note/:id" component={Note} />
          <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;

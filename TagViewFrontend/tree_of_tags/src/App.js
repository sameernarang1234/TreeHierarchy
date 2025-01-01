import './App.css';
import Navbar from './components/Navbar';
import RootTag from './components/RootTag';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './components/About';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mt-5 p-2 pb-4">
          <Routes>
            <Route>
              <Route path="/" exact element={<RootTag />}>
              </Route>
              <Route path="/about" exact element={<About/>}>
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

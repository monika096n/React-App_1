import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RegisterContainer from './containers/RegisterContainer';
import HomePage from './HomePage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterContainer />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;

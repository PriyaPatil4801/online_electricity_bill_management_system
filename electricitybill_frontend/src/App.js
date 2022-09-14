import logo from './logo.svg';
import './App.css';
import RegisterComsumer from './views/consumer/RegisterConsumer';
import Login from './views/user/Login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterSubadmin from './views/subadmin/RegisterSubadmin';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
        <Route path="" element={<Login />} />
          <Route path="/RegisterConsumer" element={<RegisterComsumer />} />
          <Route path="/RegisterSubadmin" element={<RegisterSubadmin />} />
        </Routes>
        
      </Router>
      
      </header>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import RegisterComsumer from './views/consumer/RegisterConsumer';
import Login from './views/user/Login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterSubadmin from './views/subadmin/RegisterSubadmin';
import Home from './views/user/Home';
import AdminHome from './views/admin/AdminHome';
import SubadminHome from './views/subadmin/SubadminHome';
import ConsumerHome from './views/consumer/ConsumerHome';
import AddZone from './views/admin/AddZone';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegisterConsumer" element={<RegisterComsumer />} />
          <Route path="/RegisterSubadmin" element={<RegisterSubadmin />} />
          <Route path="/AddZone" element={<AddZone/>} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/SubadminHome" element={<SubadminHome />} />
          <Route path="/ConsumerHome" element={<ConsumerHome />} />

          
        </Routes>
        
      </Router>
      
      </header>
    </div>
  );
}


export default App;

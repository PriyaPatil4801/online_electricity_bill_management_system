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
import AddUser from './views/admin/AddUser';
import BillandPaymentReport from './views/admin/BillandPaymentReport';
import GenerateBills from './views/admin/GenerateBills';
import ViewConsumer from './views/admin/ViewConsumer';
import ViewSubAdmin from './views/admin/ViewSubAdmin';
import AdminProfile from './views/admin/AdminProfile';


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
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/BillandPaymentReport" element={<BillandPaymentReport />} />
          <Route path="/GenerateBills" element={<GenerateBills />} />
          <Route path="/ViewConsumer" element={<ViewConsumer />} />
          <Route path="/ViewSubAdmin" element={<ViewSubAdmin />} />
          <Route path="/AdminProfile" element={<AdminProfile />} />

          
        </Routes>
        
      </Router>
      
      </header>
    </div>
  );
}


export default App;

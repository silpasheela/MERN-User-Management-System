import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Home from './components/Home'
import SignIn from './components/SignIn';
import AdminDashboard from './components/AdminDashboard';
import User from './components/User';



function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/viewprofile" element={<User />} />
    </Routes>
    </div>
  );
}

export default App;

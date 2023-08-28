import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Home from './components/Home'
import SignIn from './components/SignIn';
import AdminDashboard from './components/AdminDashboard';
import User from './components/User';
import NavBar from './components/NavBar';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import PublicRoutes from './utils/PublicRoutes';



function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userhome" element={<NavBar />} />

        <Route element={<PublicRoutes/>}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Route>

        <Route element={<AdminProtectedRoutes/>}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoutes/>}>
          <Route path="/viewprofile" element={<User />} />
        </Route>
    </Routes>
    </div>
  );
}

export default App;

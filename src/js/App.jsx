import '../css/cssreset.css';
import '../css/App.css';
import Login from './components/Login'
import Logout from './components/Logout'
import Profile from './components/Profile'
import SignupForm from './components/SignupForm'
import Signup from './components/Signup'
import PasswordReset from './components/PasswordReset'
import SignupPassword from './components/SignupPassword'
import NewPassword from './components/NewPassword'
import { Route, Routes, useLocation} from 'react-router-dom';
import axios from 'axios';

function App() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/SignupForm" element={<SignupForm token={token} />}></Route>
        <Route path="/SignupPassword" element={<SignupPassword />}></Route>
        <Route path="/PasswordReset" element={<PasswordReset />}></Route>
        <Route path="/NewPassword/:uidb64/:token" element={<NewPassword />} />
        <Route path="/Profile" element={<Profile />}></Route>
      </Routes>
    </div>
  </>
  );
};

export default App;

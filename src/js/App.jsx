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
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/SignupForm" element={<SignupForm />}></Route>
        <Route path="/SignupPassword" element={<SignupPassword />}></Route>
        <Route path="/PasswordReset" element={<PasswordReset />}></Route>
        <Route path="/NewPassword" element={<NewPassword/>}></Route>
        {/* <Route path="/Logout" element={<Logout />}></Route> */}
        <Route path="/Profile" element={<Profile />}></Route>
        {/* <Route path="/auth/password-reset/:uidb64/:token" component={NewPassword} /> */}
      </Routes>
    </div>
  </>
  );
};

export default App;

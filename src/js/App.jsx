import '../css/cssreset.css';
import '../css/App.css';
import Login from './components/Login'
import SignupForm from './components/SignupForm'
import Signup from './components/Signup'
import SignupPassword from './components/SignupPassword'
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/SignupForm" element={<SignupForm />}></Route>
        <Route path="/SignupPassword" element={<SignupPassword />}></Route>
      </Routes>
    </div>
  </>
  );
};

export default App;

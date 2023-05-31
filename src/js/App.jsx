import '../css/cssreset.css';
import '../css/App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
    </div>
  </>
  );
};

export default App;

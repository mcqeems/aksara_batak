import './App.css';
import { Routes, Route } from 'react-router-dom';
import Translate from './pages/translate/Translate';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Homepage from './pages/homepage/Homepage';
import Dashboard from './pages/dashboard/Dashboard';
import About from './pages/about/About';
import NotFound from './pages/notfound/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/translate" element={<Translate />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Translate from './pages/translate/Translate';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Homepage from './pages/homepage/Homepage';
import Dashboard from './pages/dashboard/Dashboard';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import NotFound from './pages/notfound/NotFound';
import Mulai from './pages/mulai/Mulai';
import Pengenalan from './pages/pengenalan/Pengenalan';
import Penjelasan from './pages/pengenalan/penjelasan/Penjelasan';
import Sejarah from './pages/pengenalan/sejarah/Sejarah';
import Chat from './pages/dashboard/chat/Chat';
import Leaderboard from './pages/dashboard/leaderboard/Leaderboard';
import Learn from './pages/dashboard/learn/Learn';
import LessonDetail from './pages/dashboard/learn/LessonDetail';
import ProtectedRoute from './components/layout/ProtectedRoutes';
import Aksara from './pages/dashboard/aksara/Aksara';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/translate" element={<Translate />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/mulai" element={<Mulai />} />
      <Route path="/pengenalan" element={<Pengenalan />} />
      <Route path="/pengenalan/penjelasan" element={<Penjelasan />} />
      <Route path="/pengenalan/sejarah" element={<Sejarah />} />

      {/* Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/aksara" element={<Aksara />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:slug" element={<LessonDetail />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

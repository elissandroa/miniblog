import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import { Dashboard } from './pages/Dashboard';
import { CreatePost } from './pages/CreatePost';



function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  },[auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }
  return (
    <AuthProvider value={user}>
      <div>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />
              <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login"/>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;

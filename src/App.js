import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Container from 'react-bootstrap/Container';
import AppNavbar from './components/AppNavbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Workouts from './components/Workouts';
import AddWorkout from './components/AddWorkout';
import {jwtDecode} from 'jwt-decode'; 
function App() {
  const [user, setUser] = useState({ id: null });

  const unsetUser = () => {
    localStorage.clear();
  }

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    setUser({
      id: decodedToken['id']
    });
  }
}, []);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addWorkout" element={<AddWorkout />} />
              <Route path="/getMyWorkouts" element={<Workouts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Container className="mt-5 text-center">
        <h1>Balik Alindog Program!</h1>
        <p>Track your workouts, stay motivated, and achieve your fitness goals with our app.</p>
        {user.id !== null ? (
          <p>
            You're logged in. Head over to <Link to="/getMyWorkouts">My Workouts</Link> to see your progress.
          </p>
        ) : (
          <p>
            New here? <Link to="/register">Sign up now</Link> and start your fitness journey!
          </p>
        )}
      </Container>
    </div>
  );
}

export default Home;

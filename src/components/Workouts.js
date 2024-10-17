import { useEffect, useState, useContext } from 'react';
import Workout from '../components/Workout';
import UserContext from '../context/UserContext';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Workouts() {
  const { user } = useContext(UserContext); 
  const [workouts, setWorkouts] = useState([]);

  const fetchData = () => {
    fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.workouts) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (user && user.id !== null) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      {user ? (
        workouts.length > 0 ? (
          <>
            <h1 className='text-center mt-5'>My Workouts</h1>
            <Row>
              {workouts.map(workout => (
                <Col md={3} key={workout._id}>
                  <Workout workout={workout} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <h1>No Workouts</h1>
        )
      ) : (
        <>
          <h1>You are not logged in</h1>
          <Link className="btn btn-primary" to={"/login"}>Login to View</Link>
        </>
      )}
    </>
  );
}
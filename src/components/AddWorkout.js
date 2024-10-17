import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function AddWorkout() {
  const notyf = new Notyf();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  // input states
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);

  function createWorkout(e) {
    // prevent submit event's default behavior
    e.preventDefault();

    let token = localStorage.getItem('token');
    console.log(token);

    fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        duration: duration
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.error) {
          setError(data.error);
          notyf.error(data.error);
        } else if (data) {
          setName("")
          setDuration("")

          notyf.success("Workout Creation Successful")
          navigate("/getMyWorkouts");
        } else {
          notyf.error("Error: Something Went Wrong.")
        }
      })
      .catch(err => {
        console.error(err);
        notyf.error("Error: Something Went Wrong.")
      })
  }

  return (
    (user.id !== null)
      ?
      <>
        <h1 className="my-5 text-center">Add Workout</h1>
        <Form onSubmit={e => createWorkout(e)}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              value={name}
              onChange={e => { setName(e.target.value) }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duration:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Duration"
              required
              value={duration}
              onChange={e => { setDuration(e.target.value) }}
            />
          </Form.Group>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button variant="primary" type="submit" className="my-5" id="addWorkout">Add Workout</Button>
        </Form>
      </>
      :
      <Navigate to="/getMyWorkouts" />
  )
}
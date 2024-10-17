import { Card, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import { useState } from 'react';

export default function Workout({ workout }) {
  const notyf = new Notyf();
  const { _id, name, duration, status } = workout;
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDuration, setUpdatedDuration] = useState(duration);

  function updateWorkoutDetails(id) {
    const updatedWorkout = {
      name: updatedName,
      duration: updatedDuration,
    };

    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedWorkout),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 'Error in Saving') {
          notyf.error(`Unsuccessful Workout Update: ${data.message}`);
        } else {
          notyf.success('Workout Updated');
          window.location.reload();
        }
      })
      .catch((error) => {
        notyf.error(`Error: ${error.message}`);
      });
  }

  function updateWorkoutStatus(id) {
    const updatedStatus = { status: 'Complete' };

    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notyf.error(`Failed to update status: ${data.message}`);
        } else {
          notyf.success('Workout status updated to Complete');
          window.location.reload();
        }
      })
      .catch((error) => {
        notyf.error(`Error: ${error.message}`);
      });
  }

  function deleteWorkout(id) {
    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 'Error in Saving') {
          notyf.error(`Unsuccessful Workout Deletion: ${data.message}`);
        } else {
          notyf.success('Workout Deleted');
          window.location.reload();
        }
      })
      .catch((error) => {
        notyf.error(`Error: ${error.message}`);
      });
  }

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>
          <Form.Control
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Workout Name"
            className="mb-2"
          />
        </Card.Title>
        <Card.Subtitle className="mb-1">Duration:</Card.Subtitle>
        <Form.Control
          type="text"
          value={updatedDuration}
          onChange={(e) => setUpdatedDuration(e.target.value)}
          placeholder="Duration (e.g., 30 mins)"
          className="mb-2"
        />
        <Card.Subtitle>Status:</Card.Subtitle>
        <Card.Text className="mb-3">{status}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => updateWorkoutDetails(_id)}
        >
          Update
        </button>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => updateWorkoutStatus(_id)}
        >
          Mark as Complete
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => deleteWorkout(_id)}
        >
          Delete
        </button>
      </Card.Footer>
    </Card>
  );
}
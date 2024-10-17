import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

function Register() {
  const notyf = new Notyf();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function register(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      notyf.error("Passwords do not match");
      return;
    }

    fetch('https://fitnessapp-api-ln8u.onrender.com/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data); 

      if (data._id) { 
        localStorage.setItem('userId', data._id);
        setUser({ id: data._id });
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        notyf.success(`You are now registered`);
      } else {
        notyf.error(data.message || `Registration failed`);
      }
    })
    .catch(error => {
      notyf.error(`An error occurred: ${error.message}`);
    });
  }

  useEffect(() => {
    setIsActive(email !== '' && password !== '' && confirmPassword !== '');
  }, [email, password, confirmPassword]);

  return (
    <div>
      <h1 className="my-5 text-center">Register</h1>
      <Form onSubmit={register}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm Password" 
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant={isActive ? "primary" : "danger"} type="submit" id="registerBtn" disabled={!isActive}>
          Register
        </Button>
        <p className="mt-3">Already have an account? <Link to="/login">Login now</Link></p>
      </Form>
    </div>
  );
}

export default Register;
import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import {jwtDecode} from 'jwt-decode'; 

export default function Login() {
    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

function authenticate(e) {
    e.preventDefault();
    fetch('https://fitnessapp-api-ln8u.onrender.com/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if(data.access !== undefined) {
             const decodedToken = jwtDecode(data.access);
                localStorage.setItem('token', data.access);
                setUser({
                    id: decodedToken.id
                });
                setEmail('');
                setPassword('');
            notyf.success(`You are now logged in`);
        } else {
            notyf.error(data.message || `${email} does not exist`);
        }
    })
    .catch(error => {
        notyf.error(`An error occurred: ${error.message}`);
    });
}

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (  
    (user.id !== null)
    ?
    <Navigate to="/getMyWorkouts" />
    :  
        <Form onSubmit={authenticate}>
            <h1 className="my-5 text-center">Login</h1>
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

            <Button variant={isActive ? "primary" : "danger"} type="submit" id="loginBtn" disabled={!isActive}>
                Login
            </Button>
            <p className="mt-3">Don't have an account? <Link to="/register">Register now</Link></p>
        </Form>       
    );
}
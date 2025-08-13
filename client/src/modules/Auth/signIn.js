import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:3000/api/login/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, phone }),
            credentials: 'include', // important if you use cookies/sessions
        });

        if (response.ok) {
            // login success, redirect or update UI
            alert('Login successful!');
        } else {
            const data = await response.json();
            setError(data.error || 'Login failed');
        }
        } catch (err) {
        setError('Network error');
        }
    };

    return (
        <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c8e2edff',
        }}>
        <form 
            onSubmit={handleSubmit}
            style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            backgroundColor: 'blue',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(176, 206, 226, 0.69)',
            minWidth: '300px',
            }}>
            <h2 style={{textAlign: 'center'}}> Sign In</h2>
            <input 
            type="text" 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            style={{margin: '10px 0', padding: '10px', fontSize: '16px'}}
            />
            <br />
            <input 
            type="text" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{margin: '10px 0', padding: '10px', fontSize: '16px'}}
            />
            <br />
            <input 
            type="text" 
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
            style={{margin: '10px 0', padding: '10px', fontSize: '16px'}}
            />
            <br />
            <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={{margin: '10px 0', padding: '10px', fontSize: '16px'}}
            />
            <br />
            <button 
                type="submit"
                style={{
                    margin: '10px 0',
                    padding: '10px',
                    fontSize: '16px',
                    backgroundColor: '#007bffff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }} 
                > Sign In 
            </button>
            <br />
            <button 
                type="button"
                onClick={() => nav('/signup')}
                style={{
                    margin: '10px 0',
                    padding: '10px',
                    fontSize: '16px',
                    backgroundColor: '#007bffff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }} 
                > Create Account 
            </button>
        </form>
        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
        </div>
    );
}

export default SignIn;

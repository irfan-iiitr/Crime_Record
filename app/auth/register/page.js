// app/auth/register.js
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, formData);
            setSuccess('Registration successful!');
        } catch (err) {
            setError('Registration failed. Try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </form>
    );
}

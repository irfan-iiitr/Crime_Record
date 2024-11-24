'use client';
import { useState } from 'react';
import axios from 'axios';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';

export default function AddRecordForm({ onRecordAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '', 
        crime: '',
        arrest_date: '',
        release_date: '',
        description: '', 
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://crime-record.onrender.com/api/records', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('Record added successfully!');
            setError('');
            setFormData({ name: '', age: '', crime: '', arrest_date: '', release_date: '', description: '' }); 
            onRecordAdded && onRecordAdded(); // Optional callback to refresh the records
        } catch (err) {
            setError('Failed to add record.');
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100">Add Criminal Record</h2>

            <div className="flex flex-col">
                <Label htmlFor="name" className="mb-1 text-gray-800 dark:text-gray-100">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter name"
                    className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="age" className="mb-1 text-gray-800 dark:text-gray-100">Age</Label>
                <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    placeholder="Enter age"
                    className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="crime" className="mb-1 text-gray-800 dark:text-gray-100">Crime</Label>
                <Input
                    id="crime"
                    name="crime"
                    value={formData.crime}
                    onChange={handleChange}
                    required
                    placeholder="Enter crime"
                    className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="arrest_date" className="mb-1 text-gray-800 dark:text-gray-100">Arrest Date</Label>
                <Input
                    id="arrest_date"
                    name="arrest_date"
                    type="date"
                    value={formData.arrest_date}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="release_date" className="mb-1 text-gray-800 dark:text-gray-100">Release Date</Label>
                <Input
                    id="release_date"
                    name="release_date"
                    type="date"
                    value={formData.release_date}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
            </div>

            <div className="flex flex-col">
                <Label htmlFor="description" className="mb-1 text-gray-800 dark:text-gray-100">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Enter description"
                    rows={3}
                    className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
            </div>

            <Button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Record</Button>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
    );
}

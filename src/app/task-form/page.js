'use client'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../redux/store';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({ existingTask, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (existingTask) {
            setTitle(existingTask.title);
            setDescription(existingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [existingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        if (existingTask) {
            dispatch(editTask({ ...existingTask, title, description }));
        } else {
            dispatch(addTask({ id: uuidv4(), title, description }));
        }
        setError('');
        onSave(); // reset the form state after saving
        setTitle(''); // Clear the title field
        setDescription(''); // Clear the description field
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 ">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <label className="block text-sm font-medium text-gray-700 ">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Save Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;

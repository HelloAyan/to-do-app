'use client'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/store';
import { useState, useEffect } from 'react';
import TaskForm from '../task-form/page';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const [editingTask, setEditingTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const tasksPerPage = 2;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleSave = () => {
        setEditingTask(null); // reset the editing task state
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++) {
        pageNumbers.push(i);
    }

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <div class="container mx-auto p-4">
                <div class="md:flex">
                    <div class="w-full md:w-1/2 md:order-1 p-4 md:mb-0 mb-8">
                        <TaskForm existingTask={editingTask} onSave={handleSave} />
                    </div>
                    <div class="w-full md:w-1/2 md:order-2  p-4">
                        <h2 className="text-xl font-bold mb-4">Task List</h2>
                        <ul className="space-y-4 mt-4">
                            {currentTasks.map((task) => (
                                <li key={task.id} className="p-4 border rounded-lg shadow">
                                    <h3 className="text-lg font-semibold">{task.title}</h3>
                                    <p className="text-gray-700">{task.description}</p>
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex justify-center space-x-2">
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => setCurrentPage(number)}
                                    className={`px-4 py-2 ${currentPage === number ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskList;

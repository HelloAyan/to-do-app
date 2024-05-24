import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = typeof window !== 'undefined' ? localStorage.getItem('tasks') : null;
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasks', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: loadState(),
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
            saveState(state);
        },
        deleteTask: (state, action) => {
            const newState = state.filter(task => task.id !== action.payload);
            saveState(newState);
            return newState;
        },
        editTask: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
                saveState(state);
            }
        },
        setTasks: (state, action) => {
            saveState(action.payload);
            return action.payload;
        },
    },
});

export const { addTask, deleteTask, editTask, setTasks } = tasksSlice.actions;

const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
    },
});

store.subscribe(() => {
    saveState(store.getState().tasks);
});

export default store;

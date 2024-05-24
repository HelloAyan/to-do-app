const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    task: ""
}
const todoSlice = createSlice({
    name: 'todoApp',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        editTask: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        setTasks: (state, action) => {
            return action.payload;
        },
    },
})

export const { addTask, deleteTask, editTask, setTasks } = todoSlice.actions;

export default todoSlice.reducer;
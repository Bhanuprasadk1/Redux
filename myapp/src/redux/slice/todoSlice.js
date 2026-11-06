import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    tasks: []
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTask: (state, action)=>{
            state.tasks.push(action.payload);
            return state
        },
        editTask: (state, action) =>{
            const {index, task} = action.payload;
            if(index >=0 && index < state.tasks.length){
                state.tasks[index] = task;
                return state;
            }
        },
        DeleteTask: (state, action) =>{
            const index = action.payload;
            state.tasks = state.tasks.filter((_, i) => i !== index);
            return state;
        }
    }
})

export const {addTask, editTask, DeleteTask} = todoSlice.actions;
export default todoSlice.reducer;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, DeleteTask } from '../redux/slice/todoSlice.js';

function TodoList() {

    const [task, setTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.todo.tasks);

    function AddTodo() {

        if (task.trim() === '') {
            return;
        }

        if (editIndex !== null) {
            // Update existing task
            dispatch(editTask({
                index: editIndex,
                task: task
            }));

            setEditIndex(null);
        }
        else {
            // Add new task
            dispatch(addTask(task));
        }

        setTask('');
    }

    function handleEditTask(index) {
        console.log('Edit task at index:', index);
        // Get existing task and display in input
        setTask(tasks[index]);

        // Store the index of the task being edited
        setEditIndex(index);
        dispatch(editTask({
            index: index,
            task: task
        }));
    }

    function handleDeleteTask(index){
        dispatch(DeleteTask(index));
    }

    return (
        <div>

            <input
                type="text"
                placeholder="Enter your task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <button onClick={AddTodo}>
                {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>

            <div>
                {tasks.length > 0 ? (
                    <ul>
                        {tasks.map((item, index) => (
                            <div key={index}>
                                <li>{item}</li>

                                <button onClick={() => handleEditTask(index)}>
                                    Edit
                                </button>

                                <button onClick={() => handleDeleteTask(index)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks to display.</p>
                )}
            </div>

        </div>
    );
}

export default TodoList;
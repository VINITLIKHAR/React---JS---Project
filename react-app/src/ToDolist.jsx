import { useState } from 'react';

function ToDolist() {

    const [tasks, setTasks] = useState(["Eat Breakfast", "Take a shower", "Walk the dog"]);
    const [newTask, setNewTask] = useState("")


    function handleInputChnage(event) {
        setNewTask(event.target.value)
    }

    function addTask() {

        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask])
            setNewTask("");
        }
    }

    function deleteTask(index) {

        const updateTasks = tasks.filter((_, i) => i !== index);
        setTasks(updateTasks);

    }

    function moveTaskUP(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }

    return (<div className='to-do-list'>

        <h1>To-Do-List</h1>

        <div>
            <input type="text" placeholder='Enter a Task...' value={newTask} onChange={handleInputChnage} />
            <button className='add-button' onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) =>
                <li key={index}>
                    <span className='text'>{task}</span>
                    <button className='delete-button ' onClick={() => deleteTask(index)}>
                        Delete
                    </button>

                    <button className='move-button ' onClick={() => moveTaskUP(index)}>
                        👆
                    </button>

                    <button className='move-button ' onClick={() => moveTaskDown(index)}>
                        👇
                    </button>
                </li>
            )}
        </ol>

    </div>)
}

export default ToDolist

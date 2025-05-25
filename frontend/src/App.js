import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5001/api/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (title) {
      await axios.post('http://localhost:5001/api/tasks', { title });
      setTitle('');
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5001/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;

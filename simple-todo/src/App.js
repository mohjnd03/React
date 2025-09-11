import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from server
  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // Add new task
  const addTask = () => {
    if (!task.trim()) return;

    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setTask("");
      })
      .catch((err) => console.error(err));
  };

  // Delete a task
  const deleteTask = (idToDelete) => {
    fetch(`http://localhost:8000/tasks/${idToDelete}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((t) => t.id !== idToDelete)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-200 via-pink-100 to-yellow-50 p-4">
      {/* Main Card */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-3xl">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
          My Todo App
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Type your task..."
            className="flex-1 p-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
          />
          <button
            onClick={addTask}
            className="bg-purple-600 text-white px-5 py-3 rounded-xl shadow hover:bg-purple-700 transform hover:scale-110 transition duration-300"
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="text-gray-800 font-medium break-words">{t.text}</span>
              <button
                onClick={() => deleteTask(t.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transform hover:scale-105 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="mt-6 text-center text-gray-400 font-medium">
            Your task list is empty!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

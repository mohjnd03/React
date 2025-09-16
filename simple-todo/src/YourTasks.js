// YourTasks.js (with Navbar added)
import React, { useState, useEffect } from "react";
import API_URL from "./config";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function YourTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-tr from-purple-200 via-pink-100 to-yellow-50">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-600 text-lg">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-purple-200 via-pink-100 to-yellow-50">
      <Navbar />
      <div className="flex items-center justify-center p-4 flex-1">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center text-purple-800 mb-4">
            Your Tasks
          </h1>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl mb-4 hover:bg-gray-700 transition duration-300"
          >
            Back to Home
          </button>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 font-medium mt-6">
              No tasks found!
            </p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span className="text-gray-800 font-medium break-words">{t.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourTasks;
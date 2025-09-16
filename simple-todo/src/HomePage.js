// HomePage.js (with Navbar added)
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-purple-200 via-pink-100 to-yellow-50">
      <Navbar />
      <div className="flex items-center justify-center p-4 flex-1">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6 flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            Welcome!
          </h1>

          <button
            onClick={() => navigate("/tasks")}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow hover:bg-purple-700 transform hover:scale-105 transition duration-300 w-full text-center"
          >
            Add New Task
          </button>

          <button
            onClick={() => navigate("/your-tasks")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transform hover:scale-105 transition duration-300 w-full text-center"
          >
            See Your Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
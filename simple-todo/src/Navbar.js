import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-purple-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div 
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Todo App
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/")}
              className={`px-3 py-2 rounded-md transition duration-300 ${
                location.pathname === "/" 
                  ? "bg-purple-900 text-white" 
                  : "hover:bg-purple-700"
              }`}
            >
              Home
            </button>
            
            <button
              onClick={() => navigate("/tasks")}
              className={`px-3 py-2 rounded-md transition duration-300 ${
                location.pathname === "/tasks" 
                  ? "bg-purple-900 text-white" 
                  : "hover:bg-purple-700"
              }`}
            >
              Add Tasks
            </button>
            
            <button
              onClick={() => navigate("/your-tasks")}
              className={`px-3 py-2 rounded-md transition duration-300 ${
                location.pathname === "/your-tasks" 
                  ? "bg-purple-900 text-white" 
                  : "hover:bg-purple-700"
              }`}
            >
              Your Tasks
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
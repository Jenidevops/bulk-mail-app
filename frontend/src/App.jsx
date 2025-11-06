import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SendEmail from "./components/SendEmail";
import EmailHistory from "./components/EmailHistory";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
          <div className="w-full px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">📧 Bulk Mail App</h1>
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/" className="hover:text-blue-100 transition text-base">
                      Send Email
                    </Link>
                    <Link to="/history" className="hover:text-blue-100 transition text-base">
                      History
                    </Link>
                    <button 
                      onClick={() => {
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                        window.location.href = "/login";
                      }}
                      className="hover:text-blue-100 transition text-base"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded font-medium text-sm">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="w-full">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={isAuthenticated ? <SendEmail /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/history" element={isAuthenticated ? <EmailHistory /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

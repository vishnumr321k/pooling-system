import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jsx } from "react/jsx-runtime";

const Header = () => {
  const { user, token, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-white">
      <div className="bg-white flex justify-end px-4 py-2"></div>
      <hr className="border-1" />
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center py-4 gap-4">
          <span className="font-mono text-2xl">Pollin System</span>

          <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-auto"></div>
            <div className="flex space-x-4">
              

              {token && (
                <>
                  <span className="text-gray-700 font-mono mt-2">
                    {user?.name} 
                  </span>

                  {user.role === "admin" && (
                    
                    <Link
                      to="/create-poll"
                      className="inline-flex font-mono items-center justify-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
                    >
                      Create Poll + (Admin)
                    </Link>
                  )}
                </>
              )}

              {!token ? (
                <Link
                  to="/login"
                  className="inline-flex font-mono items-center justify-center w-20 h-10 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
                >
                  Login
                </Link>
              ) : <button
                onClick={logout}
                className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                <i className="ri-logout-box-r-line pr-1"></i>
                Logout
              </button>}
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

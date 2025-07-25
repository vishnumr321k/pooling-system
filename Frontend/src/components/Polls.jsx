import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
const Polls = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <div>
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-4">Recent Polls</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Dummy poll card */}
          <div className="p-4 border rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                What is your favourite Framework
              </h3>
              <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm hover:bg-gray-100 transition">
                <i className="ri-eye-line"></i> Public
              </button>
            </div>

            <p className="text-gray-600">Description of the poll...</p>

            <div className="flex gap-4 text-gray-500 text-sm">
              <p className="flex items-center gap-1">
                <i className="ri-user-line"></i> 0 votes
              </p>
              <p className="flex items-center gap-1">
                <i className="ri-time-line"></i> 8 days left
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center border rounded p-2 cursor-pointer">
                <input type="radio" name="option1" className="mr-2" />
                React
              </label>
              <label className="flex items-center border rounded p-2 cursor-pointer">
                <input type="radio" name="option1" className="mr-2" />
                Angular
              </label>
            </div>

            <button className="w-full bg-gray-500 text-white font-semibold py-2 rounded mt-2 hover:bg-gray-600 transition">
              Submit Vote
            </button>
            {token && user.role === "admin" && (
              <div className="flex w-full justify-end">
                <div className="flex gap-4 w-1/3">
                  <Link
                    to="/"
                    className="flex-1 bg-black border-2 border-black text-white py-2 rounded text-center hover:bg-gray-900"
                  >
                    Delete
                  </Link>
                  <Link
                    to="/update-poll"
                    className="flex-1 bg-white border-2 border-black text-black py-2 rounded text-center hover:bg-gray-100"
                  >
                    Update
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* Add more cards here in same format to increase count */}
        </div>
      </div>
    </div>
  );
};

export default Polls;

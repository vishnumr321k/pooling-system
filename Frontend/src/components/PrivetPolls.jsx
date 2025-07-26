import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const PrivetPolls = (props) => {
  const { polls, results, setResults, votePolls, setPolls, setRefresh } = props;
  const { token, user } = useContext(AuthContext);
  const [selectOptions, setSelectedOptions] = useState({});

  const handleVotesubmition = async (pollId) => {
    const selectOption = selectOptions[pollId];
    if (!selectOption) {
      toast.error("Please select as option before voting!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}vote`,
        {
          pollId,
          selectedOption: selectOption,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Vote Submitted! 🎉");
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      toast.error("Failed to Submit Vote.");
      console.log(error);
    }
  };

  const handleDeletion = async (pollId) => {
    try {
      console.log("pollId:", pollId);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}polls/delete/${pollId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        toast.success("Poll Deletion Completed! 🎉");
        setPolls((prev) => prev.filter((p) => p._id !== pollId));
      }
    } catch (error) {
      toast.error("Poll Deletion Failed! 🥲");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {polls.map((poll) => {
            const pollExpired = (poll) => {
              const result = new Date(poll.expiryTime) < new Date();
              return result;
            };
            return (
              <div
                key={poll._id}
                className="p-4 border rounded-lg shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{poll.title}</h3>
                  {poll.isPrivate === false ? (
                    <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm hover:bg-gray-100 transition">
                      <i className="ri-eye-line"></i> Public
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm hover:bg-red-600 text-black transition">
                      <i className="ri-eye-line"></i> Privet
                    </button>
                  )}
                </div>

                <p className="text-gray-600"></p>

                <div className="flex gap-4 text-gray-500 text-sm">
                  <p className="flex items-center gap-1">
                    <i className="ri-user-line"></i>
                    {props.totalVotes} votes
                  </p>
                  <p className="flex items-center gap-1">
                    <i className="ri-time-line"></i>{" "}
                    {new Date(poll.expiryTime).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    Time left
                  </p>
                </div>

                <div className="space-y-2">
                  {poll.options.map((option, index) => {
                    return (
                      <label
                        key={index}
                        className={`flex items-center border rounded p-2 cursor-pointer ${
                          votePolls.includes(poll._id)
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={poll._id}
                          value={option}
                          className="mr-2"
                          checked={selectOptions[poll._id] === option}
                          onChange={(e) => {
                            setSelectedOptions({
                              ...selectOptions,
                              [poll._id]: e.target.value,
                            });
                          }}
                          disabled={
                            votePolls.includes(poll._id) || pollExpired(poll)
                          }
                        />
                        <span className="flex justify-between w-full">
                          {option}
                          <span className="ml-auto text-gray-500 text-sm">
                            {results[poll._id]?.[option] || 0} votes
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>

                {votePolls.includes(poll._id) || pollExpired(poll) ? (
                  <p className="text-green-500">
                    {pollExpired(poll) ? "Poll expired" : "You already Voted"}
                  </p>
                ) : (
                  <button
                    onClick={() => handleVotesubmition(poll._id)}
                    className="w-full bg-black text-white h-10 rounded-2xl"
                  >
                    Submit Vote
                  </button>
                )}

                {pollExpired(poll) && (
                  <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                    Expired
                  </span>
                )}

                {token && user.role === "admin" && (
                  <div className="flex w-full justify-end">
                    <div className="flex gap-4 w-1/3">
                      <button
                        onClick={() => handleDeletion(poll._id)}
                        className="cursor-pointer flex-1 bg-black border-2 border-black text-white py-2 rounded text-center hover:bg-gray-900"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/update-poll/${poll._id}`}
                        className="flex-1 bg-white border-2 border-black text-black py-2 rounded text-center hover:bg-gray-100"
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrivetPolls;

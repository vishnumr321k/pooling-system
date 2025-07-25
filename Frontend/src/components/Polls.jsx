import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Polls = () => {
  const { token, user } = useContext(AuthContext);
  const [polls, setPolls] = useState([]);
  const [selectOptions, setSelectedOptions] = useState({});
  const [votedPolls, setVotedPolls] = useState([]);
  const [results, setResults] = useState({});
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}polls/public`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPolls(response.data);

       

        response.data.forEach(async (poll) => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_BASE_URL}vote/has-voted/${
                poll._id
              }`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            if (response.data.hasVoted) {
              setVotedPolls((prev) => [...prev, poll._id]);
            }
          } catch (error) {
            console.error("Error checking voted status:", error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublicData();
  }, [refresh]);

  useEffect(() => {
    if (location.state?.refresh) {
      setRefresh((prev) => !prev);
    }
  }, [location.state]);

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
        setRefresh(prev => !prev);
      }
    } catch (error) {
      toast.error("Failed to Submit Vote.");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        for (let poll of polls) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_BASE_URL}vote/result/${poll._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          
          setResults((prev) => ({
            ...prev,
            [poll._id]: response.data,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, [polls]);


  const handleDeletion = async () => {

  }

  return (
    <div>
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-4">Recent Polls</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {polls.map((poll) => {
           
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
                    <i className="ri-user-line"></i> votes
                  </p>
                  <p className="flex items-center gap-1">
                    <i className="ri-time-line"></i>{" "}
                    {new Date(poll.expiryTime).toISOString().split("T")[0]},{" "}
                    {new Date(poll.expiryTime)
                      .toISOString()
                      .split("T")[1]
                      .slice(0, 5)}{" "}
                    Time left
                  </p>
                </div>

                <div className="space-y-2">
                  {poll.options.map((option, index) => {
                    return (
                      <label
                        key={index}
                        className={`flex items-center border rounded p-2 cursor-pointer ${
                          votedPolls.includes(poll._id)
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
                          disabled={votedPolls.includes(poll._id)}
                        />
                        <span className="flex justify-between w-full">
                          {option}
                          <span className="ml-auto text-gray-500 text-sm">
                            {results[poll._id]?.[option] || 0}{" "}
                            votes
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>

                {votedPolls.includes(poll._id) ? (
                  <p className="text-green-500">You already voted</p>
                ) : (
                  <button
                    onClick={() => handleVotesubmition(poll._id)}
                    className="w-full bg-black text-white h-10 rounded-2xl"
                  >
                    Submit Vote
                  </button>
                )}

                {token && user.role === "admin" && (
                  <div className="flex w-full justify-end">
                    <div className="flex gap-4 w-1/3">
                      <button
                       onClick={handleDeletion}
                        className="flex-1 bg-black border-2 border-black text-white py-2 rounded text-center hover:bg-gray-900"
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

export default Polls;

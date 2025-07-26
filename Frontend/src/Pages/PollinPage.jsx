import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Polls from "../components/Polls";
import ExpirePolls from "../components/ExpirePolls";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PrivetPolls from "../components/PrivetPolls";

const PollinPage = () => {
  const [polls, setPolls] = useState([]);
  const [privetPolls, setPrivetPolls] = useState([]);
  const [results, setResults] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [votePolls, setVotedPolls] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.refresh) {
      setRefresh((prev) => !prev);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}polls/public`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const responsePrivetPolls = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}polls/private`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("responsePrivetPolls.data:", responsePrivetPolls.data);
        setPolls(response.data);
        setPrivetPolls(responsePrivetPolls.data);

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

         responsePrivetPolls.data.forEach(async (poll) => {
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
    fetchPolls();
  }, [refresh]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const allPolls = [...polls, ...privetPolls];
        for (let poll of allPolls) {
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

    if (polls.length > 0 || privetPolls.length > 0) {
      fetchResults();
    }
  }, [polls, privetPolls]);

  const totalPolls = polls.length;
  const activePolls = polls.filter(
    (poll) => new Date(poll.expiryTime) > new Date()
  ).length;
  const totalVotes = Object.values(results).reduce((sum, optionCounts) => {
    return sum + Object.values(optionCounts).reduce((s, c) => s + c, 0);
  }, 0);

  return (
    <>
      <Header />
      <div className="p-10">
        <div className="w-full bg-white flex justify-between gap-4 p-4">
          <div className="flex-1 bg-white border-2 rounded-xl p-4 text-center shadow-sm">
            <p className="text-gray-600 font-medium">Total Polls</p>
            <p className="text-xl font-semibold">{totalPolls}</p>
          </div>
          <div className="flex-1 bg-white border-2 rounded-xl p-4 text-center shadow-sm">
            <p className="text-gray-600 font-medium">Total Votes</p>
            <p className="text-xl font-semibold">{totalVotes}</p>
          </div>
          <div className="flex-1 bg-white border-2 rounded-xl p-4 text-center shadow-sm">
            <p className="text-gray-600 font-medium">Active Polls</p>
            <p className="text-xl font-semibold">{activePolls}</p>
          </div>
        </div>
      </div>
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Public Polls</h2>
        <Polls
          polls={polls}
          results={results}
          votePolls={votePolls}
          setResults={setResults}
          setPolls={setPolls}
          setRefresh={setRefresh}
        />
      </div>

      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Privet Polls</h2>
        <PrivetPolls
          polls={privetPolls}
          results={results}
          votePolls={votePolls}
          setResults={setResults}
          setPolls={setPrivetPolls}
          setRefresh={setRefresh}
        />
      </div>
    </>
  );
};

export default PollinPage;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Polls from "../components/Polls";
import ExpirePolls from "../components/ExpirePolls";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PollinPage = () => {
  const [polls, setPolls] = useState([]);
  const [results, setResults] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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

        // Fetch results for all polls:
        const allResults = {};
        for (let poll of response.data) {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_BASE_URL}vote/result/${poll._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          allResults[poll._id] = res.data;
        }
        setResults(allResults);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);

   useEffect(() => {
    if (location.state?.refresh) {
      setRefresh((prev) => !prev);
    }
  }, [location.state]);
  
  const totalPolls = polls.length;
  const activePolls = polls.filter(
    poll => new Date(poll.expiryTime) > new Date()
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
        <Polls polls={polls} results={results} totalVotes = {totalVotes} />
      </div>
      <div className="p-10">
        <ExpirePolls polls={polls} results={results} />
      </div>
    </>
  );
};

export default PollinPage;

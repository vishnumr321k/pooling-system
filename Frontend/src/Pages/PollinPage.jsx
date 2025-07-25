import React from "react";
import Header from "../components/Header";
import Polls from "../components/Polls";
import ExpirePolls from "../components/ExpirePolls";

const PollinPage = () => {
  return (
    <>
      <Header />
      <div className="p-10">
      <div className="w-full bg-white flex justify-between gap-4 p-4">
        <div className="flex-1 bg-white border-2 rounded-xl p-4 text-center shadow-sm">
          <p className="text-gray-600 font-medium">Total Polls</p>
          <p className="text-xl font-semibold">4</p>
        </div>
        <div className="flex-1 bg-white border-2 rounded-xl p-4 text-center shadow-sm">
          <p className="text-gray-600 font-medium">Total Votes</p>
          <p className="text-xl font-semibold">115</p>
        </div>
        <div className="flex-1 bg-white border-2 rounded-xl p-4 text-center shadow-sm">
          <p className="text-gray-600 font-medium">Active Polls</p>
          <p className="text-xl font-semibold">1</p>
        </div>
      </div>
      </div>
      <div className="p-10">
        <Polls />
      </div>
      <div className="p-10">
        <ExpirePolls />
      </div>
    </>
  );
};

export default PollinPage;

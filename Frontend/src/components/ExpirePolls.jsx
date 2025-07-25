import React from "react";

const ExpirePolls = () => {
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mt-6 mb-4">Expired Polls</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow opacity-60">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Lunch choice for last week</h3>
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                Expired
              </span>
            </div>
            <p className="text-gray-600">What should we have for lunch?</p>
            {/* show vote results here */}
          </div>

          <div className="p-4 border rounded shadow opacity-60">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Frontend framework of 2024</h3>
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                Expired
              </span>
            </div>
            <p className="text-gray-600">
              Which frontend framework will dominate?
            </p>
            {/* show vote results here */}
          </div>

          {/* Add more expired polls if needed */}
        </div>
      </div>
    </div>
  );
};

export default ExpirePolls;

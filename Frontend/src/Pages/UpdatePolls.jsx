import React, { useState } from "react";
import Header from "../components/Header";

const UpdatePolls = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <>
      <Header />
      <div className="p-10 max-w-xl mx-auto border-2 m-10">
        <h1 className="text-3xl font-bold mb-1">Update Poll</h1>
        <h6 className="font-light mb-4">
          You can only update Title and Options.
        </h6>

        <div className="mb-4">
          <label className="block mb-2">Poll Title *</label>
          <input
            type="text"
            placeholder="What would you like to ask?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-4"
          />
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-xl">Poll Options</h2>
          <p className="text-gray-500 mb-2">
            Add choices people can vote for (minimum 2 required)
          </p>

          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => updateOption(index, e.target.value)}
              className="border p-2 w-full mb-2"
            />
          ))}

          <button
            type="button"
            onClick={addOption}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            + Add Option
          </button>
        </div>

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Update Poll
        </button>
      </div>
    </>
  );
};

export default UpdatePolls;

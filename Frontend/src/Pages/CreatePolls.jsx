import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

const CreatePolls = () => {
  const [title, setTitle] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [specificUsers, setSpecificUsers] = useState("");
    const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

const handleCreatPoll = async () => {
    console.log('mone nane handleCreatePoll ethi...');
    console.log('mone Chodhicha token:', localStorage.getItem('token'));
    console.log('mone title:', title);
    console.log('mone options:', options);
    console.log('isPrivate:', isPrivate);
    console.log('specificUsers:', specificUsers);
    console.log('expiryTime:', expiryTime);
    try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}polls/create`, {
        title, 
        options,
        isPrivate,
        specificUsers,
        expiryTime,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    console.log('response:', response);
    if(response.status === 201){
        toast.success('Poll creation Completed! 🎉');
        navigate('/pollin-page', {state: {refresh:true}});
    }
    } catch (error) {
        console.log(error);
    }
  
}


  return (
    <>
      <Header />
      <div className="p-10 max-w-xl mx-auto border-2 m-10">
        <h1 className="text-3xl font-bold mb-1">Create New Poll</h1>
        <h6 className="font-light mb-4">
          Design your poll and configure visibility settings.
        </h6>

        <div className="mb-4">
          <h2 className="font-semibold text-xl">Poll Details</h2>
          <p className="text-gray-500 mb-2">
            Basic information about your poll
          </p>

          <label className="block mb-2">Poll Title *</label>
          <input
            type="text"
            placeholder="What would you like to ask?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <label className="block mb-2">Expiry Time *</label>
          <input
            type="datetime-local"
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
              className="mr-2"
            />
            Make this a private poll
          </label>

          {isPrivate && (
            <div className="mb-4">
              <label className="block mb-2">
                Allowed Users (comma separated emails or IDs)
              </label>
              <textarea
                value={specificUsers}
                onChange={(e) => setSpecificUsers(e.target.value)}
                placeholder="user1@example.com, user2@example.com"
                className="border p-2 w-full"
              />
            </div>
          )}
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

        <button onClick={handleCreatPoll} className="bg-green-500 text-white px-4 py-2 rounded">
          Create Poll
        </button>
      </div>
    </>
  );
};

export default CreatePolls;

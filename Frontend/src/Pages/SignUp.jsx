import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}auth/register`,
        {
          name,
          email,
          password,
        }
      );
      if (response.status === 201) {
        toast.success("Signup successful! 🎉");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Signup failed! Please try again. 🥲");
      navigate("/signup");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <input
          className="border-2 w-full h-10 px-3 rounded mb-4 focus:outline-none focus:border-black"
          value={name}
          type="text"
          placeholder="Enter your Full Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border-2 w-full h-10 px-3 rounded mb-4 focus:outline-none focus:border-black"
          value={email}
          type="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-2 w-full h-10 px-3 rounded mb-6 focus:outline-none focus:border-black"
          value={password}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="border-2 w-full h-10 bg-black text-white rounded hover:bg-gray-900 transition"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;

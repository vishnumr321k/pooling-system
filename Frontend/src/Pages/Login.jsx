import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}auth/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 201) {
        login(response.data.token, response.data.user);
        toast.success("Login successfully! 🎉");
        navigate("/pollin-page", { replace: true });
      }
    } catch (error) {
      toast.error("Login failed! Please try again. 🥲");
      navigate("/");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input
          className="border-2 w-full h-10 px-3 rounded mb-4 focus:outline-none focus:border-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email."
        />
        <input
          className="border-2 w-full h-10 px-3 rounded mb-6 focus:outline-none focus:border-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password."
        />
        <button
          className="border-2 w-full h-10 bg-black text-white rounded hover:bg-gray-900 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
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
        navigate("/pollin-page", {replace: true});
      }
    } catch (error) {
      toast.error("Login failed! Please try again. 🥲");
      navigate("/login");
      console.log(error);
    }
  };
  return (
    <div>
      <input
        className="border-2 w-full h-10"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email."
      />{" "}
      <br />
      <br />
      <input
        className="border-2 w-full h-10"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter you Password."
      />{" "}
      <br /> <br />
      <button className="border-2 w-full h-10 bg-black text-white" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

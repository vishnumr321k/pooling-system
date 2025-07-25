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
    console.log(import.meta.env.VITE_BACKEND_BASE_URL);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}auth/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Signup successfull! 🎉");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Signup failed! Please try again. 🥲");
      navigate("/signup");
    }
  };

  return (
    <div>
      <input
        className="border-2 w-full h-10"
        value={name}
        type="text"
        placeholder="Enter your Full Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <input
        className="border-2 w-full h-10"
        value={email}
        type="email"
        placeholder="Enter your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        className="border-2 w-full h-10"
        value={password}
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button className="border-2 w-full h-10" onClick={handleSignup}>
        SignUp
      </button>
    </div>
  );
};

export default SignUp;

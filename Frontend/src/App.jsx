import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import PollinPage from "./Pages/PollinPage";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedWrapper from "./components/ProtectedWrapper";
import CreatePolls from "./Pages/CreatePolls";
import UpdatePolls from "./Pages/UpdatePolls";
import AdminProtectWraper from "./components/AdminProtectWraper";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/pollin-page"
            element={
              <ProtectedWrapper>
                <PollinPage />
              </ProtectedWrapper>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create-poll"
            element={
              <ProtectedWrapper>
                <AdminProtectWraper>
                  <CreatePolls />
                </AdminProtectWraper>
              </ProtectedWrapper>
            }
          />
          <Route
            path="/update-poll/:pollId"
            element={
              <ProtectedWrapper>
                <AdminProtectWraper>
                  <UpdatePolls />
                </AdminProtectWraper>
              </ProtectedWrapper>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          theme="colored"
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

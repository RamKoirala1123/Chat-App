import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      setError("Failed to send reset email. Check the email address.");
    }
  };

  return (
    <div className="formContainer bg-[#a7bcff] min-h-screen flex items-center justify-center p-4">
      <div className="formWrapper bg-white p-12 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl text-[#5d5b8d] font-bold text-center mb-6">Forgot Password</h1>
        <form onSubmit={handleReset} className="flex flex-col space-y-6">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-b border-[#a7bcff] focus:outline-none focus:border-[#7b96ec] transition-colors duration-300 text-[#2f2d52]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#7b96ec] text-white py-3 rounded-lg hover:bg-[#5d7bcc] transition-colors duration-300 font-bold uppercase tracking-wide shadow-md hover:shadow-lg"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="mt-6 text-center">
          <Link to="/login" className="text-[#7b96ec] font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

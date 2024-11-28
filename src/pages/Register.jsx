import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      try {
        // Update profile without a photo URL
        await updateProfile(res.user, { displayName });

        // Create user on Firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
        });

        // Create empty user chats on Firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/"); // Redirect to home or another page after successful registration
      } catch (err) {
        console.log(err);
        setErr(true);
        setLoading(false);
      }
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Secure Chat</h2>
        <h3>Register</h3>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            required
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
          {err && <span className="error-msg">Something went wrong</span>}
        </form>
        <p className="switch-to-login">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>

      <style jsx>{`
        /* Global Styles */
        body {
          margin: 0;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #2980b9, #8e44ad); /* Gradient blue to violet */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        /* Register Container */
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
        }

        .register-box {
          background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
          text-align: center;
          animation: fadeIn 1s ease-out;
        }

        /* Headings */
        .register-box h2 {
          color: #9b59b6; /* Violet */
          font-size: 32px;
          margin-bottom: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .register-box h3 {
          color: #2980b9; /* Blue */
          font-size: 24px;
          margin-bottom: 30px;
          font-weight: 500;
        }

        /* Form Inputs */
        .input-field {
          width: 100%;
          padding: 14px;
          margin-bottom: 20px;
          border: 2px solid #ecf0f1;
          border-radius: 8px;
          font-size: 16px;
          transition: 0.3s ease;
          background-color: #f9f9f9;
        }

        .input-field:focus {
          outline: none;
          border-color: #9b59b6; /* Violet */
          background-color: #ffffff;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background-color: #9b59b6; /* Violet */
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #8e44ad; /* Darker violet */
        }

        .submit-btn:disabled {
          background-color: #b39ddb;
          cursor: not-allowed;
        }

        /* Error Message */
        .error-msg {
          color: #e74c3c; /* Red */
          font-size: 14px;
          margin-top: 10px;
        }

        /* Login Link */
        .switch-to-login {
          margin-top: 20px;
          font-size: 16px;
          color: #34495e; /* Dark grey */
        }

        .login-link {
          color: #9b59b6; /* Violet */
          text-decoration: none;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        /* Animations */
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Register;

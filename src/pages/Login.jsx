import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  // Handle password input
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordStrength < 3) {
      setErr(true);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="logo">Secure Chat</h1>
          <p className="tagline">Secure communication starts here</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {password && (
              <div className="password-strength">
                <div
                  className="strength-bar"
                  style={{
                    width: `${passwordStrength * 25}%`,
                    backgroundColor:
                      passwordStrength < 2 ? '#ff4d4f' :
                        passwordStrength < 3 ? '#faad14' :
                          '#52c41a'
                  }}
                ></div>
              </div>
            )}
            <div className="password-hint">
              {passwordStrength < 2 && password ? "Weak password" :
                passwordStrength < 3 ? "Medium password" :
                  "Strong password"}
            </div>
          </div>

          {err && (
            <div className="error-message">
              {passwordStrength < 3
                ? "Password is too weak"
                : "Invalid login credentials"}
            </div>
          )}

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="form-footer">
            <p>
              Don't have an account?
              <Link to="/register" className="register-link">Register</Link>
            </p>
            <Link
              to="/forgot-password"
              className="forgot-password-link"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>

      <style jsx="true">{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes buttonHover {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Arial', sans-serif;
        }

        .login-wrapper {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          padding: 40px;
          text-align: center;
          transition: box-shadow 0.3s ease;
        }

        .login-header {
          margin-bottom: 30px;
        }

        .logo {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .tagline {
          color: #666;
          font-size: 0.9rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
          position: relative;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: 600;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
        }

        .password-strength {
          width: 100%;
          height: 4px;
          background-color: #e0e0e0;
          margin-top: 5px;
          border-radius: 2px;
          overflow: hidden;
        }

        .strength-bar {
          height: 100%;
          transition: all 0.3s ease;
        }

        .password-hint {
          font-size: 0.8rem;
          color: #666;
          margin-top: 5px;
        }

        .login-button {
          background: linear-gradient(to right, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .login-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          animation: buttonHover 0.5s ease;
        }

        .login-button:active {
          transform: translateY(1px);
        }

        .error-message {
          color: #ff4d4f;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          color: #666;
        }

        .register-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
          transition: color 0.3s ease;
        }

        .register-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        .forgot-password-link {
          color: #667eea;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .forgot-password-link:hover {
          color: #764ba2;
          text-decoration: underline;
          animation: buttonHover 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default Login;

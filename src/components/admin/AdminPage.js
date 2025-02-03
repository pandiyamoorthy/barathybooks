import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin@123";

function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Login successful", user);
          localStorage.setItem('authToken', user.accessToken); // Store auth token
          navigate('/dashboard'); // Redirect to Admin Dashboard
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Login error", errorCode, errorMessage);
          setError("Login failed. Please try again.");
        });
    } else {
      setError("Invalid admin credentials.");
    }
  };

  const handleRegister = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Registration successful", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Registration error", errorCode, errorMessage);
          setError("Registration failed. Please try again.");
        });
    } else {
      setError("Invalid admin credentials.");
    }
  };

  return (
    <section>
      <h1>Admin Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <button
            className="button"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="button"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminPage;

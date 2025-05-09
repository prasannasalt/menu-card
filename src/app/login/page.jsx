"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        // Store JWT token and redirect
        localStorage.setItem("token", data.token);
        window.location.href = "/admin";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Login request failed");
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-sky-700 mb-6">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

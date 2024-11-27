"use client";
import React, { FormEvent, useState } from "react";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
    } catch (error) {
      console.log("Could not create account", error);
    }
  };

  return (
    <>
      <form onSubmit={registerUser}>
        <label htmlFor="userName">Create a username</label>
        <input
          id="userName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="userEmail">Type your email</label>
        <input
          id="userEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="userPassword">Create a strong password</label>
        <input
          id="userPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="repeatedUserPassword">Repeat your password</label>

        <input
          id="repeatedUserPassword"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {repeatPassword && (
          <div
            style={{
              color: password === repeatPassword ? "green" : "red",
            }}
          >
            {password === repeatPassword
              ? "Passwords match!"
              : "Passwords do not match!"}
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Page;

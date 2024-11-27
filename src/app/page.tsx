"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const result = await signIn("credentials", {
      redirect: false,
      userName,
      password,
    });

    setLoader(false);

    if (result?.error) {
      setErrorMessage("Invalid username or password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="userName">Username:</label>
        <input
          id="userName"
          className="textInput"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className="textInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <button type="submit">Login</button>

        {loader && (
          <div className="spinnerWrapper">
            <div className="spinner"></div>
          </div>
        )}
      </form>
    </>
  );
};

export default Login;

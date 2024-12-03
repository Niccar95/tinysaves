"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Spinner from "./components/Spinner";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setErrorMessage("Invalid username or password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <section className="content">
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="userName">Username:</label>
          <input
            id="userName"
            className="textInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          {loading && (
            <div className="spinnerWrapper">
              <Spinner />
            </div>
          )}

          <button className="loginButton" type="submit">
            Log in
          </button>
        </form>

        <Link href="/registration">Don&apos;t have an account?</Link>
      </section>
    </>
  );
};

export default Login;

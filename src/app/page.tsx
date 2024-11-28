"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const result = await signIn("credentials", {
      redirect: false,
      name,
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
      <section className="content">
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="userName">Username:</label>
          <input
            id="userName"
            className="textInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

          <button className="loginButton" type="submit">
            Log in
          </button>

          {loader && (
            <div className="spinnerWrapper">
              <div className="spinner"></div>
            </div>
          )}
        </form>

        <Link href="/registration">Don&apos;t have an account?</Link>
      </section>
    </>
  );
};

export default Login;

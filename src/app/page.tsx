"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Spinner from "./components/Spinner";
import { login } from "@/utils/validationSchemas";
import Image from "next/image";

const Login = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = login.validate({ name, password }, { abortEarly: false });

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );

      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      name,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setErrors({ general: "Invalid username or password" });
      setLoginSuccess(false);
    } else {
      setLoginSuccess(true);
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className="authPageWrapper">
        <section className="content authPage">
          <h1>Log in</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="userName">Username:</label>
            <div className="inputWrapper">
              <input
                id="userName"
                className="textInput"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: "" });
                }}
              ></input>
              {errors.name && <div className="errorMessage">{errors.name}</div>}
            </div>

            <label htmlFor="password">Password:</label>

            <div className="inputWrapper">
              <input
                id="password"
                className="textInput"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
              ></input>

              {errors.password && (
                <div className="errorMessage">{errors.password}</div>
              )}
            </div>
            {errors.general && (
              <div className="errorMessage">{errors.general}</div>
            )}
            {loginSuccess && (
              <div className="successMessage">Logged in successfully!</div>
            )}

            {loading && (
              <div className="spinnerWrapper">
                <Spinner />
              </div>
            )}

            <button type="submit" className="loginButton margin">
              Log in
            </button>
          </form>

          <section className="authLinkSection">
            <Link className="authLink" href="/registration">
              Don&apos;t have an account?
            </Link>
            <Link className="authLink" href="/resetPassword">
              Forgot your password?
            </Link>
          </section>
        </section>
        <div className="bannerWrapper">
          <Image className="banner" src="/banner.svg" alt="banner" fill></Image>
        </div>
      </div>
    </>
  );
};

export default Login;

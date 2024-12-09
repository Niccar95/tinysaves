"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Spinner from "./components/Spinner";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "This is a required field",
  }),
  password: Joi.string().required().messages({
    "string.empty": "This is a required field",
  }),
});

const Login = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = schema.validate({ name, password });

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
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="textInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}

          {errors.general && (
            <div style={{ color: "red" }}>{errors.general}</div>
          )}

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

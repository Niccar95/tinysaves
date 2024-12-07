"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import Spinner from "../components/Spinner";

const schema = Joi.object({
  name: Joi.string().min(3).required().label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(6).required().label("Password"),
  repeatPassword: Joi.valid(Joi.ref("password"))
    .required()
    .label("Repeat Password")
    .messages({
      "any.only": "Passwords must match",
    }),
});

const Page = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
  }>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      setError(error.details.map((err) => err.message).join(", "));
      setLoader(false);
      return;
    }

    try {
      await fetch(`${baseUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      router.push("/");
    } catch (error) {
      console.log("Could not create account", error);
    }
    setLoader(false);
  };

  return (
    <>
      <section className="content">
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <label htmlFor="userName">Create a username:</label>
          <input
            id="userName"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="userEmail">Type your email:</label>
          <input
            id="userEmail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="userPassword">Create a strong password:</label>
          <input
            id="userPassword"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <label htmlFor="repeatedUserPassword">Repeat your password:</label>

          <input
            id="repeatedUserPassword"
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
          />

          {error && <div style={{ color: "red" }}>{error}</div>}

          {formData.password &&
            formData.password === formData.repeatPassword && (
              <div style={{ color: "green" }}>Passwords match!</div>
            )}

          {loader && (
            <div className="spinnerWrapper">
              <Spinner />
            </div>
          )}

          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
      </section>
    </>
  );
};

export default Page;

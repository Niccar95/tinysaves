"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "../components/Spinner";
import { register } from "@/utils/validationSchemas";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const { error } = register.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
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
          {errors.name && <div className="errorMessage">{errors.name}</div>}{" "}
          <label htmlFor="userEmail">Type your email:</label>
          <input
            id="userEmail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="errorMessage">{errors.email}</div>}{" "}
          <label htmlFor="userPassword">Create a strong password:</label>
          <input
            id="userPassword"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="errorMessage">{errors.password}</div>
          )}
          <label htmlFor="repeatedUserPassword">Repeat your password:</label>
          <input
            id="repeatedUserPassword"
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
          {errors.repeatPassword && (
            <div className="errorMessage">{errors.repeatPassword}</div>
          )}
          {formData.password &&
            formData.password === formData.repeatPassword && (
              <div className="successMessage">Passwords match!</div>
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

"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "../components/Spinner";
import { register } from "@/utils/validationSchemas";
import Link from "next/link";
import Image from "next/image";

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
  const [serverError, setServerError] = useState<string>("");

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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 409) {
        setServerError(data.message);
      } else if (response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      console.log("Could not create account", error);
    }
    setLoader(false);
  };

  return (
    <>
      <div className="authPageWrapper">
        <section className="content authPage">
          <h1>Register</h1>
          <form onSubmit={registerUser}>
            <label htmlFor="userName">Create a username:</label>
            <div>
              <input
                id="userName"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="errorMessage">{errors.name}</div>}{" "}
            </div>
            <label htmlFor="userEmail">Type your email:</label>
            <div>
              <input
                id="userEmail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="errorMessage">{errors.email}</div>
              )}{" "}
            </div>
            <label htmlFor="userPassword">Create a strong password:</label>
            <div>
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
            </div>
            <label htmlFor="repeatedUserPassword">Repeat your password:</label>
            <div>
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
            </div>
            {formData.password &&
              formData.password === formData.repeatPassword && (
                <div className="successMessage">Passwords match!</div>
              )}
            {loader && (
              <div className="spinnerWrapper">
                <Spinner />
              </div>
            )}

            {serverError && <div className="errorMessage">{serverError}</div>}

            <button type="submit" className="registerButton margin">
              Register
            </button>
          </form>
          <section className="authLinkSection">
            <Link className="authLink toLogin" href="/">
              <i className="bi bi-arrow-left-short"></i>
              Back to login page
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

export default Page;

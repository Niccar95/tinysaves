"use client";

import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Spinner from "./Spinner";
import { login } from "@/utils/validationSchemas";
import { useTranslations } from "next-intl";

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const t = useTranslations("loginPage");

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const { error } = login.validate({ name, password }, { abortEarly: false });

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );

      setErrors(newErrors);
      setLoader(false);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      name,
      password,
    });

    setLoader(false);

    if (result?.error) {
      setErrors({ general: "Invalid username or password" });
      setSuccess(false);
    } else {
      setSuccess(true);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="userName">{t("username")}</label>
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

      <label htmlFor="password">{t("password")}</label>
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

      {errors.general && <div className="errorMessage">{errors.general}</div>}
      {success && <div className="successMessage">Logged in successfully!</div>}

      {loader && (
        <div className="spinnerWrapper">
          <Spinner />
        </div>
      )}

      <button type="submit" className="loginButton margin">
        {t("login")}
      </button>
    </form>
  );
};

export default LoginForm;

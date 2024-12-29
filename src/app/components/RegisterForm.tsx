"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "../components/Spinner";
import { register } from "@/utils/validationSchemas";
import { registerUser } from "@/services/authService";

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
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

  const handleRegisterUser = async (e: FormEvent) => {
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
      const serverError = await registerUser(formData);

      if (serverError) {
        setServerError(serverError);
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error("Unexpected error", error);
      setServerError("An unexpected error occurred.");
    }

    setLoader(false);
  };

  return (
    <form onSubmit={handleRegisterUser}>
      <label htmlFor="userName">Create a username:</label>
      <div>
        <input
          id="userName"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="errorMessage">{errors.name}</div>}
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
        {errors.email && <div className="errorMessage">{errors.email}</div>}
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

      {formData.password && formData.password === formData.repeatPassword && (
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
  );
};

export default RegisterForm;

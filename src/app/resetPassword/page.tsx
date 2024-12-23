"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import { resetPassword } from "@/utils/validationSchemas";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    email: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const { error } = resetPassword.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
      setLoader(false);
      return;
    }

    try {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setLoader(false);

      if (!response.ok) {
        setErrors({ general: "Invalid email" });
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Failed to reset password", error);
      setLoader(false);
      setErrors({ general: "An error occurred. Please try again later" });
    }
  };

  return (
    <section className="content">
      <h1>Reset Your Password</h1>

      <form onSubmit={handleResetPassword}>
        <label htmlFor="email">Enter your email:</label>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="errorMessage">{errors.email}</div>}
        </div>

        <label htmlFor="newPassword">New password:</label>
        <div>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && (
            <div className="errorMessage">{errors.newPassword}</div>
          )}
        </div>

        <label htmlFor="confirmPassword">Confirm new password:</label>
        <div>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="errorMessage">{errors.confirmPassword}</div>
          )}
        </div>

        {formData.newPassword &&
          formData.newPassword === formData.confirmPassword && (
            <div className="successMessage">Passwords match!</div>
          )}

        {errors.general && <div className="errorMessage">{errors.general}</div>}

        {loader && (
          <div className="spinnerWrapper">
            <Spinner />
          </div>
        )}

        <button type="submit" className="resetPasswordButton margin">
          Reset Password
        </button>
      </form>
    </section>
  );
};

export default ResetPasswordPage;

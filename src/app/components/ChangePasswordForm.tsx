"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { changePassword } from "@/utils/validationSchemas";
import { changeUserPassword } from "@/services/authService";

const ChangePasswordForm = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting form...");
    setLoader(true);

    const { error } = changePassword.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
      setLoader(false);
      console.log("Validation errors:", error.details);

      return;
    }

    const serverError = await changeUserPassword(formData);

    if (serverError) {
      setErrors({ general: serverError });
      setSuccess(false);
    } else {
      setSuccess(false);
      toast.success("Your password has been successfully changed 🔒");
    }

    setLoader(false);
  };

  return (
    <form onSubmit={handleChangePassword}>
      <label htmlFor="currentPassword">Current password:</label>
      <div>
        <input
          id="currentPassword"
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />
        {errors.currentPassword && (
          <div className="errorMessage">{errors.currentPassword}</div>
        )}
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

      <label htmlFor="confirmPassword">Confirm password: </label>
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
        Change password
      </button>

      {success && (
        <div className="successMessage">Password changed succesfully!</div>
      )}
    </form>
  );
};

export default ChangePasswordForm;

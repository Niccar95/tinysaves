"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { resetPassword } from "@/utils/validationSchemas";
import Spinner from "../components/Spinner";
import { getSession } from "next-auth/react";
import { resetUserPassword } from "@/services/authService";

interface ResetPasswordFormProps {
  onSuccess: () => void;
}

const ResetPasswordForm = ({ onSuccess }: ResetPasswordFormProps) => {
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
  const [success, setSuccess] = useState<boolean>(false);

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

    const serverError = await resetUserPassword(formData);

    if (serverError) {
      setErrors({ general: serverError });
      setSuccess(false);
    } else {
      await getSession();
      setSuccess(false);
      onSuccess();
    }

    setLoader(false);
  };

  return (
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

      {success && (
        <div className="successMessage">Password reset succesfully!</div>
      )}

      {loader && (
        <div className="spinnerWrapper">
          <Spinner />
        </div>
      )}

      <button type="submit" className="resetPasswordButton margin">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;

import {
  goalForm,
  goalProgress,
  login,
  register,
  resetPassword,
} from "@/utils/validationSchemas";
import { DateTime } from "luxon";

describe("Joi Validation Tests", () => {
  describe("Register Schema", () => {
    it("should pass with valid data", () => {
      const result = register.validate({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        repeatPassword: "password123",
      });
      expect(result.error).toBeUndefined();
    });

    it("should fail if name is less than 3 characters", () => {
      const result = register.validate({
        name: "Jo",
        email: "john@example.com",
        password: "password123",
        repeatPassword: "password123",
      });
      if (result.error) {
        expect(result.error.details[0].message).toBe(
          '"name" length must be at least 3 characters long'
        );
      }
    });

    it("should fail if email is invalid", () => {
      const result = register.validate({
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
        repeatPassword: "password123",
      });
      if (result.error) {
        expect(result.error.details[0].message).toBe(
          '"email" must be a valid email'
        );
      }
    });
  });

  describe("Login Schema", () => {
    it("should pass with valid data", () => {
      const result = login.validate({
        name: "John Doe",
        password: "password123",
      });
      expect(result.error).toBeUndefined();
    });

    it("should fail if name is missing", () => {
      const result = login.validate({ password: "password123" });
      if (result.error) {
        expect(result.error.details[0].message).toBe('"name" is required');
      }
    });
  });

  describe("Goal Form Schema", () => {
    it("should pass with valid data", () => {
      const result = goalForm.validate({
        title: "Save for a car",
        targetAmount: "5000",
        dueDate: DateTime.now().plus({ days: 1 }).toISO(),
      });
      expect(result.error).toBeUndefined();
    });

    it("should fail if targetAmount is not a number", () => {
      const result = goalForm.validate({
        title: "Save for a car",
        targetAmount: "invalid",
        dueDate: DateTime.now().plus({ days: 1 }).toISO(),
      });
      if (result.error) {
        expect(result.error.details[0].message).toBe(
          "Target amount must be a valid number"
        );
      }
    });

    it("should fail if dueDate is in the past", () => {
      const result = goalForm.validate({
        title: "Save for a car",
        targetAmount: "5000",
        dueDate: DateTime.now().minus({ days: 1 }).toISO(),
      });
      if (result.error) {
        expect(result.error.details[0].message).toBe(
          "The due date cannot be in the past"
        );
      }
    });
  });

  describe("Goal Progress Schema", () => {
    it("should pass with valid data", () => {
      const result = goalProgress.validate({ progress: "100" });
      expect(result.error).toBeUndefined();
    });

    it("should fail if progress is not a number", () => {
      const result = goalProgress.validate({ progress: "invalid" });
      if (result.error) {
        expect(result.error.details[0].message).toBe(
          "Value must be a valid number"
        );
      }
    });
  });

  describe("Reset Password Schema", () => {
    it("should pass with valid data", () => {
      const result = resetPassword.validate({
        email: "john@example.com",
        newPassword: "newpassword123",
        confirmPassword: "newpassword123",
      });
      expect(result.error).toBeUndefined();
    });

    it("should fail if newPassword and confirmPassword do not match", () => {
      const result = resetPassword.validate({
        email: "john@example.com",
        newPassword: "newpassword123",
        confirmPassword: "differentpassword",
      });
      if (result.error) {
        expect(result.error.details[0].message).toBe("Passwords must match");
      }
    });
  });
});

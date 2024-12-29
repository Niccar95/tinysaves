import Joi from "joi";
import { DateTime } from "luxon";

export const register = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "This is a required field",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "This is a required field",
    }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "This is a required field",
    "string.min": "Password must be at least 8 characters",
  }),
  repeatPassword: Joi.valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
  }),
});

export const login = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "This is a required field",
  }),
  password: Joi.string().required().messages({
    "string.empty": "This is a required field",
  }),
});

export const goalForm = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.min": "Goal name must be at least 3 characters",
    "string.empty": "This is a required field",
  }),
  targetAmount: Joi.string()
    .custom((value, helpers) => {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        return helpers.error("number.base");
      }
      if (numericValue <= 0) {
        return helpers.error("number.greater");
      }
      return value;
    })
    .required()
    .messages({
      "string.empty": "This is a required field",
      "number.base": "Target amount must be a valid number",
      "number.greater": "Target amount must be greater than 0",
    }),
  dueDate: Joi.string()
    .allow("")
    .optional()
    .custom((value, helpers) => {
      if (!value) return value;

      const today = DateTime.now().startOf("day");
      const dueDate = DateTime.fromISO(value);

      if (dueDate < today) {
        return helpers.error("date.isPast");
      }

      if (dueDate.hasSame(today, "day")) {
        return helpers.error("date.isToday");
      }

      return value;
    })
    .messages({
      "date.isPast": "The due date cannot be in the past",
      "date.isToday": "The due date cannot be today's date",
    }),
});

export const goalProgress = Joi.object({
  progress: Joi.string()
    .custom((value, helpers) => {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        return helpers.error("number.base");
      }
      if (numericValue <= 0) {
        return helpers.error("number.greater");
      }
      return value;
    })
    .required()
    .messages({
      "string.empty": "This is a required field",
      "number.base": "Value must be a valid number",
      "number.greater": "Value must be greater than 0",
    }),
});

export const goalTitle = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.min": "New name must be at least 3 characters",
    "string.empty": "This is a required field",
  }),
});

export const resetPassword = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "This is a required field",
      "string.email": "Please provide a valid email address",
    }),

  newPassword: Joi.string().min(8).required().messages({
    "string.empty": "This is a required field",
    "string.min": "Password must be at least 8 characters",
  }),

  confirmPassword: Joi.valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Passwords must match",
    "string.empty": "This is a required field",
  }),
});

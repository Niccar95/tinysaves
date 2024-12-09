import Joi from "joi";
import { DateTime } from "luxon";

export const register = Joi.object({
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
    "string.min":
      "Your savings goal name should have a minimum length of 3 characters",
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
      "number.base": "Target amount must be a valid number",
      "number.greater": "Target amount must be greater than 0",
    }),
});

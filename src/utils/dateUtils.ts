import { DateTime } from "luxon";

export const processDueDate = (dueDate: Date | null) => {
  if (!dueDate) {
    return { formattedDate: null, daysRemaining: null };
  }

  const luxonDate = DateTime.fromJSDate(new Date(dueDate));

  if (!luxonDate.isValid) {
    return { formattedDate: null, daysRemaining: null };
  }

  const formattedDate = luxonDate.toFormat("dd LLL yyyy");
  const daysRemaining = Math.round(luxonDate.diff(DateTime.now(), "days").days);

  return { formattedDate, daysRemaining };
};

export const processCreatedAtDate = (createdAt: Date | null) => {
  if (!createdAt) {
    return { formattedCreatedAtDate: null };
  }

  const luxonDate = DateTime.fromJSDate(new Date(createdAt));

  if (!luxonDate.isValid) {
    return { formattedCreatedAtDate: null };
  }

  const formattedCreatedAtDate = luxonDate.toFormat("dd LLL yyyy");

  return { formattedCreatedAtDate };
};

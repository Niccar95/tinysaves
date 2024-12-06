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

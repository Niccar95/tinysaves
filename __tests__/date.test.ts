import { processCreatedAtDate, processDueDate } from "@/utils/dateUtils";

describe("processDueDate", () => {
  it("should return null values for null or invalid due dates", () => {
    expect(processDueDate(null)).toEqual({
      formattedDate: null,
      daysRemaining: null,
      hoursRemaining: null,
    });
    expect(processDueDate(new Date("invalid-date"))).toEqual({
      formattedDate: null,
      daysRemaining: null,
      hoursRemaining: null,
    });
  });

  it("should format a valid due date correctly", () => {
    const dueDate = new Date("2024-12-31");
    const result = processDueDate(dueDate);

    expect(result.formattedDate).toBe("31 Dec 2024");
    expect(typeof result.daysRemaining).toBe("number");
    expect(typeof result.hoursRemaining).toBe("number");
  });
});

describe("processCreatedAtDate", () => {
  it("should return null for null or invalid createdAt dates", () => {
    expect(processCreatedAtDate(null)).toEqual({
      formattedCreatedAtDate: null,
    });
    expect(processCreatedAtDate(new Date("invalid-date"))).toEqual({
      formattedCreatedAtDate: null,
    });
  });

  it("should format a valid createdAt date correctly", () => {
    const createdAt = new Date("2024-01-01");
    const result = processCreatedAtDate(createdAt);

    expect(result.formattedCreatedAtDate).toBe("01 Jan 2024");
  });
});

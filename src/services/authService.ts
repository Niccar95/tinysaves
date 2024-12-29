export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}): Promise<string | null> => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 409) {
      return data.message;
    } else if (response.status === 201) {
      return null;
    }
    throw new Error("Failed to register user");
  } catch (error) {
    console.error("Error registering user:", error);
    return "An error occurred. Please try again.";
  }
};

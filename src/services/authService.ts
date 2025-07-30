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

export const resetUserPassword = async (formData: {
  email: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<string | null> => {
  try {
    const response = await fetch("/api/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      return "Invalid email";
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to reset password", error);
    return "An error occurred. Please try again later";
  }
};

export const changeUserPassword = async (formData: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<string | null> => {
  try {
    const response = await fetch("/api/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      return "Invalid password";
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to change password", error);
    return "An error occurred. Please try again later";
  }
};

export const changeTheme = async (theme: string): Promise<string | null> => {
  try {
    const response = await fetch("/api/settings", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme }),
    });

    if (!response.ok) {
      return "Invalid theme";
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to change theme", error);
    return "An error occurred. Please try again later";
  }
};

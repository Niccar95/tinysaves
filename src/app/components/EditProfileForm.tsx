"use client";
import React, { useState } from "react";

interface EditUserFormProps {
  displayName: string;
}

const EditProfileForm = ({ displayName }: EditUserFormProps) => {
  const [userDisplayName, setUserDisplayName] = useState<string>(displayName);
  const handleEditProfile = async () => {
    try {
      await fetch("/api/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userDisplayName,
        }),
      });
    } catch (error) {
      console.log("Error trying to edit user", error);
    }
  };

  return (
    <>
      <form onSubmit={handleEditProfile}>
        <label htmlFor="changeName">Add display name: </label>
        <div className="inputContainer">
          <input
            id="changeName"
            type="text"
            value={userDisplayName}
            onChange={(e) => setUserDisplayName(e.target.value)}
            disabled
          />
          <i className="bi bi-pencil"></i>
        </div>

        <button type="submit" className="saveButton">
          Save changes
        </button>
      </form>
    </>
  );
};

export default EditProfileForm;

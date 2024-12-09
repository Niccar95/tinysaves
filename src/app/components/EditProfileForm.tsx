"use client";
import React, { useState } from "react";

interface EditUserFormProps {
  name: string;
  email: string;
}

const EditProfileForm = ({ name, email }: EditUserFormProps) => {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPassword, setUserPassword] = useState<string>("");

  const handleEditProfile = async () => {
    try {
      await fetch("/api/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          userEmail,
          userPassword,
        }),
      });
    } catch (error) {
      console.log("Error trying to edit user", error);
    }
  };

  return (
    <>
      <form onSubmit={handleEditProfile}>
        <label htmlFor="changeName">Change your username: </label>
        <div className="inputContainer">
          {userName != undefined && (
            <input
              id="changeName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled
            />
          )}
          <i className="bi bi-pencil"></i>
        </div>

        <label htmlFor="changeEmail">Change your email: </label>
        <div className="inputContainer">
          <input
            id="changeEmail"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            disabled
          />
          <i className="bi bi-pencil"></i>
        </div>

        <label htmlFor="changePassword">Change your password: </label>
        <div className="inputContainer">
          <input
            id="changePassword"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            disabled
          />
          <i className="bi bi-pencil"></i>
        </div>

        <label htmlFor="repeatPassword">Repeat your password: </label>
        <div className="inputContainer">
          <input
            id="repeatPassword"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
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

"use client";
import { findUser } from "@/utils/validationSchemas";
import React, { useState } from "react";
import Spinner from "./Spinner";
import { findUserName } from "@/services/userService";
import Image from "next/image";

const AddFriendForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const presetAvatar = "/presetAvatar.svg";

  const openFriendModal = () => {
    setIsOpen(!isOpen);
  };

  const handleFindUser = async (val: string) => {
    setUserName(val);
    setErrors({ ...errors, userName: "" });
    setSuccess(false);
    setFoundUser("");

    if (!val.trim()) {
      setLoader(false);
      return;
    }

    setLoader(true);

    const { error } = findUser.validate(
      { userName: val },
      { abortEarly: false }
    );

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
      setLoader(false);
      return;
    }

    const result = await findUserName(val);

    if (result) {
      setFoundUser(result.name);
      setUserAvatar(result.image || presetAvatar);
      setSuccess(true);
    } else {
      setErrors({ userName: "Cannot find username" });
      setSuccess(false);
    }

    setLoader(false);
  };

  return (
    <div>
      <button className="actionButton" onClick={openFriendModal}>
        <i className="bi bi-person-plus-fill"></i>
        Add friend
      </button>

      {isOpen && (
        <div
          className="modalBackdrop"
          onClick={() => {
            setIsOpen(false);
            setUserName("");
            setFoundUser("");
            setErrors({});
          }}
        >
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <form className="findUserForm" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="findUser">Search by username:</label>
              <div className="inputWrapper">
                <input
                  id="findUser"
                  className="textInput"
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    handleFindUser(e.target.value);
                  }}
                ></input>
                {errors.userName && (
                  <div className="errorMessage">{errors.userName}</div>
                )}
              </div>
              {success && foundUser && (
                <div className="successMessage">Username found!</div>
              )}
              {success && foundUser && (
                <article className="profilePreviewCard">
                  <div className="profileHeader">
                    <div className="userImageWrapper userImageWrapper--small">
                      <Image
                        src={userAvatar}
                        alt="User Avatar"
                        className="avatarPreview"
                        width="50"
                        height="50"
                      />
                    </div>
                    <h2>{foundUser}</h2>
                  </div>
                  <button className="actionButton">
                    <i className="bi bi-send-fill"></i>
                    Send request
                  </button>
                </article>
              )}
              {loader && (
                <div className="spinnerWrapper">
                  <Spinner />
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFriendForm;

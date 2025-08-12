"use client";
import { findUser } from "@/utils/validationSchemas";
import React, { useRef, useState } from "react";
import Spinner from "./Spinner";
import { findUserName, sendFriendRequest } from "@/services/userService";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const AddFriendForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const presetAvatar = "/presetAvatar.svg";

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const { data: session } = useSession();
  const fromUserName = session?.user?.name || "";

  const openFriendModal = () => {
    setIsOpen(!isOpen);
  };

  const handleFindUser = async (value: string) => {
    setErrors({ userName: "" });
    setSuccess(false);
    setFoundUser("");

    if (!value.trim()) {
      setLoader(false);
      return;
    }

    setLoader(true);

    const { error } = findUser.validate(
      { userName: value },
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

    const result = await findUserName(value);

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

  const handleInputChange = (value: string) => {
    setUserName(value);
    setErrors({});
    setSuccess(false);
    setFoundUser("");
    setLoader(false);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim().length >= 3) {
      debounceTimer.current = setTimeout(() => {
        handleFindUser(value);
      }, 400);
    } else if (value.trim().length > 0) {
      const { error } = findUser.validate(
        { userName: value },
        { abortEarly: false }
      );
      if (error) {
        const newErrors = Object.fromEntries(
          error.details.map(({ path, message }) => [path[0], message])
        );
        setErrors(newErrors);
      }
    }
  };

  const handleSendRequest = async () => {
    try {
      setLoader(true);

      await sendFriendRequest(foundUser, fromUserName);
      toast.success(`Friend request sent to ${foundUser}!`);
    } catch (error) {
      toast.error(`Failed to send friend request, ${error}`);
    } finally {
      setLoader(false);
    }
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
            setSuccess(false);
            setLoader(false);
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
                  onChange={(e) => handleInputChange(e.target.value)}
                />
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
                        width={50}
                        height={50}
                      />
                    </div>
                    <h2>{foundUser}</h2>
                  </div>
                  <button className="actionButton" onClick={handleSendRequest}>
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

"use client";

import { useRouter } from "next/navigation";
import React from "react";

const EditButton = () => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push("/profile/edit");
  };
  return (
    <>
      <button className="editButton" onClick={handleEditClick}>
        <i className="bi bi-pencil"></i>
        Edit profile
      </button>
    </>
  );
};

export default EditButton;

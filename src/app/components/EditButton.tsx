"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

const EditButton = () => {
  const router = useRouter();

  const t = useTranslations("profileInfo");

  const handleEditClick = () => {
    router.push("/profile/edit");
  };
  return (
    <>
      <button className="editButton" onClick={handleEditClick}>
        <i className="bi bi-pencil"></i>
        {t("edit")}
      </button>
    </>
  );
};

export default EditButton;

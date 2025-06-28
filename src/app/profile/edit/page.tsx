import EditProfileForm from "@/app/components/EditProfileForm";
import { getTranslations } from "next-intl/server";

import React from "react";

const EditUserPage = async () => {
  const t = await getTranslations("profileInfo");
  return (
    <>
      <section className="content">
        <h1>{t("edit")}</h1>

        <EditProfileForm />
      </section>
    </>
  );
};

export default EditUserPage;

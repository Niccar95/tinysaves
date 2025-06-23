import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("pages");
  const ts = await getTranslations("userSettings");

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <section className="content">
        <h1>{t("settings")}</h1>
        <section className="settingsSection">
          <div className="settingsWrapper">
            <h2>{ts("heading")}</h2>

            <DeleteAccountButton />
          </div>
        </section>
      </section>
    </>
  );
};

export default SettingsPage;

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ThemeToggle from "../components/ThemeToggle";
import prisma from "../db";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("pages");
  const ts = await getTranslations("userSettings");

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const userSettings = await prisma.userSettings.findFirst({
    where: { userId: userId },
  });

  const theme = userSettings?.theme;

  return (
    <>
      <section className="content">
        <h1>{t("settings")}</h1>
        <section className="settingsSection">
          <h2>Display settings</h2>
          <div className="settingsWrapper">
            <h3>Change theme</h3>
            <ThemeToggle currentTheme={theme} />
          </div>

          <h2>{ts("heading")}</h2>
          <div className="settingsWrapper">
            <h3>Change password</h3>
            <ChangePasswordForm />

            <h3>Remove account</h3>
            <DeleteAccountButton />
          </div>
        </section>
      </section>
    </>
  );
};

export default SettingsPage;

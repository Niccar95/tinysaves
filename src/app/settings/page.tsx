import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <section className="content">
        <h1>Settings</h1>
        <section className="settingsSection">
          <div className="settingsWrapper">
            <h2>User settings</h2>

            <DeleteAccountButton />
          </div>
        </section>
      </section>
    </>
  );
};

export default SettingsPage;

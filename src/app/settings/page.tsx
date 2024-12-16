import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User is not authenticated or session is invalid");
  }

  return (
    <>
      <section className="content">
        <h1>Settings</h1>
        <section className="settingsSection">
          <div className="settingsWrapper">
            <h2>General settings</h2>

            <h3>Light mode</h3>
          </div>

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

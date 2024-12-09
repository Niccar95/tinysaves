import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import EditButton from "../components/EditButton";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section className="content">
        <h1>You need to be logged in to access this page</h1>
      </section>
    );
  }

  const userName = session.user?.name;

  return (
    <>
      <section className="content">
        <h1>My Profile</h1>

        <EditButton />

        <article className="profileCard">
          <div className="userImageContainer">
            <button className="addImageButton">
              <i className="bi bi-plus-circle addImageIcon"></i>
            </button>
          </div>
          <h2>{userName}</h2>
        </article>
      </section>
    </>
  );
};

export default ProfilePage;

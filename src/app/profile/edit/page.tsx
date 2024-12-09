import EditProfileForm from "@/app/components/EditProfileForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const EditUserPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section className="content">
        <h1>You need to be logged in to access this page</h1>
      </section>
    );
  }

  return (
    <>
      <section className="content">
        <h1>Edit profile</h1>

        <EditProfileForm displayName={""} />
      </section>
    </>
  );
};

export default EditUserPage;

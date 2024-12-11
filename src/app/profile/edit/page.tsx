import EditProfileForm from "@/app/components/EditProfileForm";

import React from "react";

const EditUserPage = async () => {
  return (
    <>
      <section className="content">
        <h1>Edit profile</h1>

        <EditProfileForm />
      </section>
    </>
  );
};

export default EditUserPage;

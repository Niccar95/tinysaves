"use client";

import React from "react";
import SavingsForm from "../components/SavingsForm";

const page = () => {
  return (
    <>
      <section className="content">
        <h1>Dashboard</h1>

        <SavingsForm></SavingsForm>
      </section>
    </>
  );
};

export default page;

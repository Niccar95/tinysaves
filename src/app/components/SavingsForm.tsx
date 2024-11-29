"use client";

import React from "react";

const SavingsForm = () => {
  return (
    <>
      <section className="savingsForm">
        <h2>Add your savings goal</h2>
        <form>
          <input type="text"></input>
          <input type="number"></input>
          <input type="date"></input>
          <button type="submit">Add goal</button>
        </form>
      </section>
    </>
  );
};

export default SavingsForm;

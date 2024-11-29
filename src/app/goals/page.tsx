import React from "react";
import GoalList from "../components/GoalList";

const Page = () => {
  return (
    <>
      <section className="content">
        <h1>My goals</h1>

        <GoalList></GoalList>
      </section>
    </>
  );
};

export default Page;

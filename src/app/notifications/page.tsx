import React from "react";
import prisma from "../db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const notifications = await prisma.notifications.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="content">
      {notifications.length > 0 ? (
        <ul className="notificationsList">
          {notifications.map((notification, i) => (
            <li className="notification" key={i}>
              <p className="notificationMessage">{notification.message}</p>

              <div className="notificationActions">
                <button className="actionButton small">
                  <i className="bi bi-check-circle-fill"></i>
                  Accept
                </button>
                <button className="actionButton small declineButton">
                  <i className="bi bi-x-circle-fill"></i>
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications to show at the moment</p>
      )}
    </section>
  );
};

export default page;

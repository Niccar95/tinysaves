import React from "react";
import Image from "next/image";
import prisma from "@/app/db";

interface DashboardFriendsCardProps {
  userId: string;
}

const DashboardFriendsCard = async ({ userId }: DashboardFriendsCardProps) => {
  const presetAvatar = "/presetAvatar.svg";

  const friendships = await prisma.friendship.findMany({
    where: { userId },
    include: {
      friend: {
        select: {
          userId: true,
          name: true,
          displayName: true,
          image: true,
        },
      },
    },
  });

  const friends = friendships.map((f) => f.friend);

  return (
    <article className="latestCard">
      <span className="goalCardLabel">Friends:</span>
      <div className="cardMainContent">
        {friends.length === 0 && (
          <p className="noGoalsLabel">No friends added yet</p>
        )}

        {friends.length > 0 && (
          <ul className="dashboardFriendsList">
            {friends.map((friend) => (
              <li key={friend.userId} className="dashboardFriendItem">
                <div className="userImageWrapper userImageWrapper--xsmall">
                  <Image
                    src={friend.image || presetAvatar}
                    alt={friend.name}
                    width={40}
                    height={40}
                    className="avatarPreview"
                  />
                </div>
                <div>
                  <p className="dashboardFriendName">
                    {friend.displayName || friend.name}
                  </p>
                  <p className="dashboardFriendUsername">@{friend.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

export default DashboardFriendsCard;

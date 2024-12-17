"use client";

import { Badges, UserBadges } from "@prisma/client";

interface IBadgesProps {
  userBadges: (UserBadges & { badge: Badges })[];
}

const BadgesList = ({ userBadges }: IBadgesProps) => {
  return (
    <>
      {userBadges.map((userBadge) => (
        <article key={userBadge.id}>
          <h3>{userBadge.badge?.name}</h3>
          <p>{userBadge.badge?.criteria}</p>
        </article>
      ))}
    </>
  );
};

export default BadgesList;

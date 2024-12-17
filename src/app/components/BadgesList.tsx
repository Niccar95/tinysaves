"use client";

import { Badges, UserBadges } from "@prisma/client";
import Badgecard from "./Badgecard";

interface IUserBadgesProps {
  userBadges: (UserBadges & { badge: Badges })[];
}

const BadgesList = ({ userBadges }: IUserBadgesProps) => {
  return (
    <>
      <div className="badgesListWrapper">
        {userBadges.length > 0 ? (
          userBadges.map((userBadge) => (
            <Badgecard key={userBadge.id} badge={userBadge.badge} />
          ))
        ) : (
          <p>No badges to display!</p>
        )}
      </div>
    </>
  );
};

export default BadgesList;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

interface Friend {
  userId: string;
  name: string;
  displayName?: string | null;
  image?: string | null;
}

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const presetAvatar = "/presetAvatar.svg";

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("/api/friends");
        if (response.ok) {
          const data = await response.json();
          setFriends(data.friends);
        }
      } catch (error) {
        console.error("Failed to fetch friends", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <>
      {loading && (
        <div className="spinnerWrapper">
          <Spinner />
        </div>
      )}

      {!loading && friends.length === 0 && <p>No friends added yet</p>}

      {!loading && friends.length > 0 && (
        <ul className="friendsList">
          {friends.map((friend) => (
            <li key={friend.userId} className="friendAvatar">
              <div className="userImageWrapper userImageWrapper--small">
                <Image
                  src={friend.image || presetAvatar}
                  alt={friend.name}
                  width={60}
                  height={60}
                  className="avatarPreview"
                />
              </div>
              <div>
                <p className="friendDisplayName">
                  {friend.displayName || friend.name}
                </p>
                <p className="friendUsername">@{friend.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FriendsList;

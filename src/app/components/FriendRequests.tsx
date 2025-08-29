"use client";
import { useSession } from "next-auth/react";
import { useFriendRequests } from "../hooks/useFriendRequests";

const FriendRequests = () => {
  const { data: session } = useSession();
  const loggedInUser = session?.user?.name || "";
  useFriendRequests(loggedInUser);

  return null;
};

export default FriendRequests;

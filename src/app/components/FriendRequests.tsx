"use client";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useFriendRequests } from "../hooks/useFriendRequests";
import { useEffect } from "react";

const FriendRequests = () => {
  const { data: session } = useSession();
  const loggedInUser = session?.user?.name || "";
  const requests = useFriendRequests(loggedInUser);

  useEffect(() => {
    if (requests.length === 0) return;

    const latestRequest = requests[requests.length - 1];
    if (latestRequest.from !== loggedInUser) {
      toast.info(`New friend request from ${latestRequest.from}`);
    }
  }, [requests, loggedInUser]);

  return null;
};

export default FriendRequests;

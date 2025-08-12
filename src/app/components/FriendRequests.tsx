"use client";

import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "eu";

const FriendRequests = () => {
  const [requests, setRequests] = useState<{ from: string; to: string }[]>([]);
  const requestsRef = useRef(requests);

  const { data: session } = useSession();
  const loggedInUser = session?.user?.name || "";

  useEffect(() => {
    requestsRef.current = requests;
  }, [requests]);

  useEffect(() => {
    if (!pusherKey || !loggedInUser) return;

    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe("friend-requests");

    channel.bind("new-friend-request", (data: { from: string; to: string }) => {
      setRequests([...requestsRef.current, data]);

      if (data.from !== loggedInUser) {
        toast.info(`New friend request from ${data.from}`);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [loggedInUser]);

  return null;
};

export default FriendRequests;

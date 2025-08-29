import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
const pusherCluster = process.env.PUSHER_CLUSTER || "eu";

interface FriendRequest {
  from: string;
  to: string;
}

export function useFriendRequests(loggedInUser: string) {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const requestsRef = useRef(requests);

  useEffect(() => {
    requestsRef.current = requests;
  }, [requests]);

  useEffect(() => {
    if (!pusherKey || !loggedInUser) return;

    const pusher = new Pusher(pusherKey, { cluster: pusherCluster });
    const channel = pusher.subscribe("friend-requests");

    channel.bind("new-friend-request", (data: FriendRequest) => {
      setRequests([...requestsRef.current, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [loggedInUser, requests]);

  return requests;
}

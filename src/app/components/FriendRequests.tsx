"use client";

import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { toast } from "react-toastify";

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "eu";

const FriendRequests = () => {
  const [requests, setRequests] = useState<{ from: string; to: string }[]>([]);
  const requestsRef = useRef(requests);

  useEffect(() => {
    requestsRef.current = requests;
  }, [requests]);

  useEffect(() => {
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe("friend-requests");

    channel.bind("new-friend-request", (data: { from: string; to: string }) => {
      setRequests([...requestsRef.current, data]);
      toast.info(`New friend request from ${data.from}`);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  return (
    <div>
      <h3>Friend Requests</h3>
      <ul>
        {requests.map((req, index) => (
          <li key={index}>
            From: {req.from} To: {req.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;

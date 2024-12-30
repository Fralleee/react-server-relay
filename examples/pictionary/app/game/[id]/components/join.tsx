import React, { useState } from "react";
import { useMultiplayerContext } from "react-socket-relay";
import { useRouter } from "next/router";

const JoinRoom = () => {
  const { joinRoom } = useMultiplayerContext();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const handleJoin = async () => {
    try {
      const success = await joinRoom(roomId);
      if (success) {
        router.push(`/room/${roomId}`);
      } else {
        alert("Failed to join room");
      }
    } catch (error) {
      console.error(error);
      alert("Error joining room");
    }
  };

  return (
    <>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button onClick={handleJoin}>Join Room</button>
    </>
  );
};

export default JoinRoom;

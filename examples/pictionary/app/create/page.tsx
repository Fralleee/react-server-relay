// examples/nextjs-example/pages/create.tsx
import React from "react";
import { useMultiplayerContext } from "react-socket-relay";
import { useRouter } from "next/router";

const CreateRoom = () => {
  const { createRoom } = useMultiplayerContext();
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const roomId = await createRoom({
        maxPlayers: 4,
        gameType: "pictionary",
      });
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create room");
    }
  };

  return <button onClick={handleCreate}>Create Room</button>;
};

export default CreateRoom;

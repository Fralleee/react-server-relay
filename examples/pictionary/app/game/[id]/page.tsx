// examples/nextjs-example/pages/room/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import { useMultiplayer } from "react-socket-relay";
import ChatBox from "../../components/ChatBox";
import UserList from "../../components/UserList";
import SettingsPanel from "../../components/SettingsPanel";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const { users, isAdmin, messages, sendMessage } = useMultiplayer(
    id as string,
    {
      onUserJoin: (user) => console.log(`${user} joined the room`),
      onUserLeave: (user) => console.log(`${user} left the room`),
    }
  );

  if (!id) return null;

  return (
    <div>
      <h1>Room: {id}</h1>
      <UserList users={users} />
      <SettingsPanel isAdmin={isAdmin} />
      <ChatBox messages={messages} onSend={sendMessage} />
      {/* Additional game or collaboration components */}
    </div>
  );
};

export default Room;

import { useEffect, useState } from "react";
import { useMultiplayerContext } from "../multiplayer-provider";

interface UseMultiplayerOptions {
  onUserJoin?: (user: string) => void;
  onUserLeave?: (user: string) => void;
  onMessage?: (message: string) => void;
  // Additional callbacks as needed
}

interface UseMultiplayerReturn {
  users: string[];
  isAdmin: boolean;
  messages: { userId: string; message: string }[];
  sendMessage: (message: string) => void;
  // Additional state and methods
}

export const useMultiplayer = (roomId: string, options?: UseMultiplayerOptions): UseMultiplayerReturn => {
  const { socket } = useMultiplayerContext();
  const [users, setUsers] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ userId: string; message: string }[]>([]);

  useEffect(() => {
    if (!roomId || !socket) return;

    socket.emit(
      "joinRoom",
      roomId,
      (response: { success: boolean; users?: string[]; settings?: any; isAdmin?: boolean; error?: string }) => {
        if (response.success && response.users) {
          setUsers(response.users);
          setIsAdmin(response.isAdmin || false);
        }
      }
    );

    socket.on("userJoined", (user: string) => {
      setUsers((prev) => [...prev, user]);
      options?.onUserJoin && options.onUserJoin(user);
    });

    socket.on("userLeft", (user: string) => {
      setUsers((prev) => prev.filter((u) => u !== user));
      options?.onUserLeave && options.onUserLeave(user);
    });

    socket.on("message", (data: { userId: string; message: string }) => {
      setMessages((prev) => [...prev, data]);
      options?.onMessage && options.onMessage(data.message);
    });

    // Cleanup on unmount
    return () => {
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("message");
    };
  }, [roomId, socket, options]);

  const sendMessage = (message: string) => {
    socket?.emit("sendMessage", { roomId, message });
  };

  return { users, isAdmin, messages, sendMessage };
};

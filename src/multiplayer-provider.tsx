import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface MultiplayerContextProps {
  socket: Socket | null;
  createRoom: (settings: any) => Promise<string>;
  joinRoom: (roomId: string) => Promise<boolean>;
  leaveRoom: (roomId: string) => Promise<void>;
  // Additional methods as needed
}

const MultiplayerContext = createContext<MultiplayerContextProps | undefined>(undefined);

interface MultiplayerProviderProps {
  serverUrl: string;
  options?: any; // Additional client-side options
  children: React.ReactNode;
}

export const MultiplayerProvider: React.FC<MultiplayerProviderProps> = ({ serverUrl, options, children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(serverUrl, { ...options });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [serverUrl, options]);

  const createRoom = (settings: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      socket?.emit("createRoom", settings, (response: { success: boolean; roomId?: string; error?: string }) => {
        if (response.success && response.roomId) {
          resolve(response.roomId);
        } else {
          reject(new Error(response.error || "Failed to create room"));
        }
      });
    });
  };

  const joinRoom = (roomId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      socket?.emit("joinRoom", roomId, (response: { success: boolean; error?: string }) => {
        if (response.success) {
          resolve(true);
        } else {
          reject(new Error(response.error || "Failed to join room"));
        }
      });
    });
  };

  const leaveRoom = (roomId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      socket?.emit("leaveRoom", roomId, (response: { success: boolean; error?: string }) => {
        if (response.success) {
          resolve();
        } else {
          reject(new Error(response.error || "Failed to leave room"));
        }
      });
    });
  };

  return <MultiplayerContext.Provider value={{ socket, createRoom, joinRoom, leaveRoom }}>{children}</MultiplayerContext.Provider>;
};

export const useMultiplayerContext = (): MultiplayerContextProps => {
  const context = useContext(MultiplayerContext);
  if (!context) {
    throw new Error("useMultiplayerContext must be used within a MultiplayerProvider");
  }
  return context;
};

import { selectedUserState, userState } from "@/types";
import { create } from "zustand";

export const useUser = create<userState>((set) => ({
  myUser: undefined,
  setUser: (user: any) => set({ myUser: user }),
}));

export const useAllUsers = create((set) => ({
  users: undefined,
  setUsers: (users: any) => set({ users: users }),
}));

export const useSelectedUser = create<selectedUserState>((set) => ({
  selectedUser: undefined,
  setSelectedUser: (user: any) => set({ selectedUser: user }),
}));

export const useMessages = create((set) => ({
  messages: undefined,
  setMessages: (messages: any) => set({ messages: messages }),
}));

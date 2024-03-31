"use client";
import { fetchUser } from "@/lib/fetchers";
import { useUser } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { shallow } from "zustand/shallow";
import SearchBar from "./SearchBar";
import ChatList from "./ChatList";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["user"]);
  const { myUser, setUser } = useUser(
    (state) => ({ myUser: state.myUser, setUser: state.setUser }),
    shallow
  );

  useEffect(() => {
    fetchUser(cookie, setUser);
  }, []);

  if (!myUser) {
    router.push("/");
  }

  return (
    <div className="w-full md:!block sidebar z-10 border-r-2 border-slate-400 md:w-1/2 lg:w-1/3 p-3 bg-white dark:bg-gray-800 h-screen overflow-auto no-scrollbar">
      {/* Searchbar */}
      <SearchBar user={myUser} />

      {myUser && <ChatList mySelf={myUser} />}
    </div>
  );
};

export default Sidebar;

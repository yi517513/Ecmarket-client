import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useFetchUserInfoByUid } from "@features/user/hooks/useUserQuery";
import { useChatStore } from "@app/stores/useChatStore";
import { SearchResult } from "./SearchResult";

export const RecipientSearch = () => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);

  const setRecipient = useChatStore((s) => s.setRecipient);

  const { mutateAsync: fetchUserInfoByUid } = useFetchUserInfoByUid();

  const handleSearch = async (userUid) => {
    try {
      const res = await fetchUserInfoByUid(userUid);
      setUser(res);
      setErr(null);
    } catch (error) {
      const errMessage = error?.response?.data;
      setErr(errMessage);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setInput(value);
    setErr(null);

    if (!value) {
      setUser(null);
    }
  };

  const validateInput = (input) => {
    const num = Number(input);
    if (!/^\d+$/.test(input) || num < 100000 || num > 199999) {
      setErr("編號為六位數字");
      return false;
    }
    return true;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!validateInput(input)) return;
      handleSearch(input);
    }
  };

  const handleOnClick = () => {
    setRecipient(user);
    setUser(null);
  };

  return (
    <div className="relative flex flex-col w-full h-[5%]">
      <div className="flex">
        <SearchIcon className="text-gray-700 p-1" />
        <input
          type="text"
          placeholder="Enter搜尋會員編號"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full p-1 focus:outline-none text-xs text-gray-800"
        />
      </div>

      {(user || err) && (
        <div className="z-10 h-16 absolute cursor-pointer bg-gray-200 hover:scale-105 top-full left-0 w-full rounded-xl border text-sm">
          <SearchResult user={user} err={err} onClick={handleOnClick} />
        </div>
      )}
    </div>
  );
};

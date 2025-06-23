import { useUserStore } from "@app/stores/useUserStore";
import React from "react";

export const SelfInfo = () => {
  const uid = useUserStore((s) => s.uid);
  const username = useUserStore((s) => s.username);

  return (
    <div className="h-[10%] bg-white flex flex-col items-start px-2 py-1">
      <span className="text-sm font-semibold text-gray-900 truncate">
        {username}
      </span>
      <span className="text-xs font-semibold text-gray-500 truncate">
        No.{uid}
      </span>
    </div>
  );
};

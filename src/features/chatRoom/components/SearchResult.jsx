import React from "react";

export const SearchResult = ({ user, err, onClick }) => {
  if (err) {
    return <div className="text-gray-600 p-2 block h-full">{err}</div>;
  }
  return (
    <div className="p-2 block h-full" onClick={onClick}>
      <div className="font-semibold text-gray-800 mb-1">{user?.username}</div>
      <div className="text-gray-600">No.{user?.uid}</div>
    </div>
  );
};

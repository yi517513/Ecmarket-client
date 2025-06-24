export const UnreadHint = ({ hasInput, hasScroll }) => {
  if (hasInput || hasScroll) return null;

  return (
    <p className="bg-gray-300 text-gray-800 text-sm border-red-500 my-2">
      以下訊息未讀
    </p>
  );
};

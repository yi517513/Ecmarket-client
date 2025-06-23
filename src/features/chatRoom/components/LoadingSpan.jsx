import { useEffect, useState } from "react";

export const LoadingSpan = ({ ready }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    } else {
      setVisible(true); // 若切換聊天對象再次 loading
    }
  }, [ready]);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-3">
        <RingSpinner />
      </div>
    </div>
  );
};

const RingSpinner = () => (
  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
);

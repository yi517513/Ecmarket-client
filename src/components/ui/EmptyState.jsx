import { AlertCircle } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="h-[480px] flex flex-col items-center justify-center py-16 text-gray-500">
      <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
      <p className="text-sm">目前尚無資料</p>
    </div>
  );
};

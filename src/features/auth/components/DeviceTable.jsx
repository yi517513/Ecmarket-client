import React from "react";
import { Trash2 } from "lucide-react";

export const DeviceTable = ({
  sessions = [],
  isLoading,
  isError,
  handleDelete,
}) => {
  return (
    <div className="w-full h-full p-8 md:p-16">
      {isLoading && <p>載入中...</p>}
      {isError && <p>載入失敗</p>}

      <h1 className="text-center text-2xl font-semibold text-gray-800 tracking-wide mb-8">
        裝置管理
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-white rounded-xl">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4 font-medium">裝置名稱</th>
              <th className="text-left px-6 py-4 font-medium">登入時間</th>
              <th className="text-left px-6 py-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {sessions?.map?.((session, idx) => {
              const { deviceLabel, loginAt, jti } = session || {};
              return (
                <tr
                  key={jti || idx}
                  className={`hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {deviceLabel}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(loginAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(jti)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                      title="刪除裝置"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

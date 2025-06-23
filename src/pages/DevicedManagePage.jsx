import React from "react";
import { DeviceTable } from "@features/auth/components/DeviceTable";
import { useSession } from "@features/auth/hooks/useAuthQuery";
import { notifyUtils as notify } from "@utils/notify";

export const DevicedManagePage = () => {
  const { data: sessions, isLoading, isError } = useSession();
  const handleDelete = () => {
    notify.warn("尚未開發");
  };
  return (
    <DeviceTable
      sessions={sessions}
      isLoading={isLoading}
      isError={isError}
      handleDelete={handleDelete}
    />
  );
};

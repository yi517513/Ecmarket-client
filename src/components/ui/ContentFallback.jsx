import React from "react";
import { LoadingOverlay } from "@components/ui/LoadingOverlay";
import { EmptyState } from "@components/ui/EmptyState";

export const ContentFallback = ({ isLoading, isEmpty, children }) => {
  if (isLoading) return <LoadingOverlay />;
  if (isEmpty) return <EmptyState />;

  return <>{children}</>;
};

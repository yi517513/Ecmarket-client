import { getOrdersApi } from "../api/orderApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrders = (queryParams) => {
  const queryKey = ["private", "Orders", queryParams];

  return useQuery({
    queryKey,
    queryFn: () => getOrdersApi(queryParams),
    placeholderData: (previousData) => previousData ?? [],
    retry: false,
  });
};

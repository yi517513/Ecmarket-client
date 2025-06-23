import { getImagesApi } from "../api/imageApi";
import { useProtectedQuery } from "@hooks/useProtectedQuery";

export const useFetchImages = ({ enabled } = {}) => {
  return useProtectedQuery({
    queryKey: ["private", "images"],
    queryFn: getImagesApi,
    retry: false,
    enabled: enabled ?? true,
  });
};

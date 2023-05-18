import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useUploadImage = (onSuccess, onError) => {
  return useMutation(
    "upload",
    (image) => {
      const formData = new FormData();
      formData.append("image", image);
      return axios.post(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

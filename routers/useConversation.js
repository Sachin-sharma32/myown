import axios from "axios";
import { useQuery, useMutation, userQueryClient } from "react-query";

export const useAssistence = (onSuccess, onError) => {
  return useMutation(
    "assistence",
    (prompt) => {
      prompt;
      return axios.post(
        "https://theblogforeverything-backend-h8fa.vercel.app/assistence",
        { prompt }
      );
    },
    {
      onSuccess: (data) => {
        data;
        onSuccess(data);
      },
      onError: (error) => {
        error;
      },
    }
  );
};

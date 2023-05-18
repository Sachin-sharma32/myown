import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTags } from "../redux/slices";

export const useCreateTag = (onSuccess, onError) => {
  return useMutation(
    "createTag",
    () => {
      return axios.post(
        "https://theblogforeverything-backend-h8fa.vercel.app/api/v1/tags"
      );
    },
    {
      onSuccess,
      onError,
    }
  );
};

export const useGetAllTags = () => {
  const dispatch = useDispatch();
  return useQuery(
    "tags",
    () => {
      return axios.get(
        "https://theblogforeverything-backend-h8fa.vercel.app/api/v1/tags"
      );
    },
    {
      onSuccess: (data) => {
        dispatch(setTags(data.data.data.docs));
        const tags = data.data.data.docs;
        return tags;
      },
    }
  );
};

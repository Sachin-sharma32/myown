import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCategories } from "../redux/slices";

export const useAllCategories = (onSuccess, onError) => {
  const dispatch = useDispatch();
  return useQuery(
    "categories",
    () => {
      return axios.get(
        "https://theblogforeverything-backend-h8fa.vercel.app/api/v1/categories"
      );
    },
    {
      onSuccess: (data) => {
        dispatch(setCategories(data.data.data.docs));
      },
      onError: onError,
    }
  );
};

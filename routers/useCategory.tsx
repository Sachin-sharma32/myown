import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCategories } from "../redux/slices";

export const useAllCategories = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const dispatch = useDispatch();
  return useQuery(
    "categories",
    () => {
      return axios.get("http://localhost:8000/api/v1/categories");
    },
    {
      onSuccess: (data) => {
        dispatch(setCategories(data.data.data.docs));
      },
      onError: onError,
    }
  );
};

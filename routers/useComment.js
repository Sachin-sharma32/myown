import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";

export const useGetComments = (postId) => {
  return useQuery(
    "comments",
    () => {
      return axios.get(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/comments/${postId}`
      );
    },
    {
      enabled: !!postId,
      select: (data) => {
        const comments = data.data.data.docs;
        return comments;
      },
    }
  );
};

export const useDeleteComment = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "deleteComment",
    (commentId) => {
      return axios.delete(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/comments/${commentId}`
      );
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["comments"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};

export const useAddComment = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "addComment",
    (data) => {
      data;
      return axios.post(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/comments/${data.postId}`,
        data.data
      );
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["comments"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};

export const useUpdateComment = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    "updateComment",
    (data) => {
      return axios.patch(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/comments/${data.commentId}`,
        data.data
      );
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["comments"]);
        onSuccess();
      },
      onError: onError,
    }
  );
};

export const useHandleCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "handleCommentLike",
    (data) => {
      return axios.patch(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/comments/${data.commentsId}/comment/${data.commentId}`,
        {
          userId: data.userId,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
      select: (data) => {
        const comment = data.data.data.doc;
        return comment;
      },
    }
  );
};

export const useGetComment = (commentsId, commentId) => {
  const queryClient = useQueryClient();
  return useQuery(
    "comment",
    () => {
      return axios.get(
        `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/comments/${commentsId}/comment/${commentId}`
      );
    },
    {
      select: (data) => {
        const comment = data.data.data.doc;
        return comment;
      },
    }
  );
};

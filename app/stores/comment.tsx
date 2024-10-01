import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import useGetCommentByPostId from "../hooks/useGetCommentByPostId";
import { CommentWithProfile } from "../types";

interface CommentStore {
  commentsByPost: CommentWithProfile[];
  setCommentsByPost: (postId: string) => void;
}

export const useCommentStore = create<CommentStore>()(
  devtools(
    persist(
      (set) => ({
        commentsByPost: [],

        setCommentsByPost: async (postId: string) => {
          const result = await useGetCommentByPostId(postId);
          set({ commentsByPost: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

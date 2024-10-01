import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import useGetProfileByUserId from "../hooks/useGetProfileByUserId";
import { Post, PostWithProfile, Profile } from "../types";
import useGetAllPosts from "../hooks/useGetAllPosts";
import useGetPostByUser from "../hooks/useGetPostByUser";
import useGetPostById from "../hooks/useGetPostById";

interface PostStore {
  allPost: PostWithProfile[];
  postsByUser: Post[];
  postById: PostWithProfile | null;
  setAllPosts: () => void;
  setPostsByUser: (userId: string) => void;
  setPostById: (postId: string) => void;
}

export const usePostStore = create<PostStore>()(
  devtools(
    persist(
      (set) => ({
        allPost: [],
        postsByUser: [],
        postById: null,

        setAllPosts: async () => {
          const result = await useGetAllPosts();
          set({ allPost: result });
        },
        setPostsByUser: async (userId: string) => {
          const result = await useGetPostByUser(userId);
          set({ postsByUser: result });
        },
        setPostById: async (postId: string) => {
          const result = await useGetPostById(postId);
          set({ postById: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { RiShareForwardFill } from "react-icons/ri";
import { Like, PostMainLikesCompType, Comment } from "../types";
import { useGeneralStore } from "../stores/general";
import { useUser } from "../context/user";
import useGetLikesByPostId from "../hooks/useGetLikesByPostId";
import useGetCommentByPostId from "../hooks/useGetCommentByPostId";
import useIsLiked from "../hooks/useIsLiked";
import useCreateLike from "../hooks/useCreateLike";
import useDeleteLike from "../hooks/useDeleteLike";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";

export default function PostMainLike({ post }: PostMainLikesCompType) {
  let { setIsLoginOpen } = useGeneralStore();

  const contextUser = useUser();
  const [hasClickedLike, setHasClikedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[] | undefined>([]);

  const router = useRouter();

  useEffect(() => {
    getAllLikeByPost();
    getAllCommentByPost();
  }, [post]);

  useEffect(() => {
    hasUserLikedPost();
  }, [likes, contextUser]);

  const getAllLikeByPost = async () => {
    let result = await useGetLikesByPostId(post?.id);
    setLikes(result);
  };

  const getAllCommentByPost = async () => {
    let result = await useGetCommentByPostId(post?.id);
    setComments(result);
  };

  const hasUserLikedPost = () => {
    if (!contextUser) return;
    if (likes?.length < 1 || !contextUser?.user?.id) {
      setUserLiked(false);
      return;
    }

    let res = useIsLiked(contextUser?.user.id, post?.id, likes);
    setUserLiked(res ? true : false);
  };

  const like = async () => {
    try {
      setHasClikedLike(true);
      await useCreateLike(contextUser?.user?.id || "", post.id);
      await getAllLikeByPost();
      hasUserLikedPost();
      setHasClikedLike(false);
    } catch (error) {
      alert(error);
    }
  };

  const unlike = async (id: string) => {
    try {
      setHasClikedLike(true);
      await useDeleteLike(id);
      await getAllLikeByPost();
      hasUserLikedPost();
      setHasClikedLike(false);
    } catch (error) {
      alert(error);
    }
  };

  const likeOrUnlike = () => {
    if (!contextUser?.user) return setIsLoginOpen(true);

    let res = useIsLiked(contextUser.user.id, post?.id, likes);
    if (!res) {
      like();
    } else {
      likes.forEach((like) => {
        if (
          contextUser?.user?.id &&
          contextUser.user.id == like.user_id &&
          like.post_id == post?.id
        ) {
          unlike(like.id);
        }
      });
    }
  };
  return (
    <>
      <div id={`PostMainLike-${post.id}`} className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-2">
          <div className="pb-4 cursor-pointer">
            <img
              src={useCreateBucketUrl(post.profile.image)}
              alt=""
              className="rounded-full max-h-[60px]"
              width={60}
            />

            <div className="-mt-3 flex items-center justify-center bottom-2">
              <button className="p-1 bg-red-500 rounded-full">
                <AiOutlinePlus color="#ffffff" size="10" />
              </button>
            </div>
          </div>
          <div className="pb-4 text-center">
            <button
              disabled={hasClickedLike}
              onClick={() => likeOrUnlike()}
              className="rounded-full bg-gray-200 p-2 cursor-pointer"
            >
              {!hasClickedLike ? (
                <AiFillHeart
                  color={likes?.length > 0 && userLiked ? "#FF2626" : ""}
                  size={"25"}
                />
              ) : (
                <BiLoaderCircle className="animate-spin" size={"25"} />
              )}
            </button>
            <span className="text-xs text-gray-800 font-semibold">
              {likes?.length}
            </span>
          </div>

          <button
            onClick={() =>
              router.push(`/post/${post.id}/${post.profile.user_id}`)
            }
            className="pb-4 text-center"
          >
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaCommentDots size="25" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">
              {comments?.length}
            </span>
          </button>

          <button className="pb-4 text-center">
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <RiShareForwardFill size="25" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">55</span>
          </button>
        </div>
      </div>
    </>
  );
}

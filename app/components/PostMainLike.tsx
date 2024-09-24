"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { RiShareForwardFill } from "react-icons/ri";
import { Like, PostMainLikesCompType, Comment } from "../types";

export default function PostMainLike({ post }: PostMainLikesCompType) {
  const [hasClickedLike, setHasClikedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const router = useRouter();

  const likeOrUnlike = () => {
    setUserLiked(true);
  };
  return (
    <>
      <div id={`PostMainLike-${post.id}`} className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-2">
          <div className="pb-4 cursor-pointer">
            <img
              src={post.profile.image}
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

"use client";

import React, { useEffect, useState } from "react";
import { PostMainCompType } from "../types";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import PostMainLike from "./PostMainLike";

export default function PostMain({ post }: PostMainCompType) {
  useEffect(() => {
    const video = document.getElementById(
      `video-${post?.id}`
    ) as HTMLVideoElement;
    const postMainElement = document.getElementById(`PostMain-${post.id}`);

    if (postMainElement) {
      let observer = new IntersectionObserver(
        (entries) => {
          entries[0].isIntersecting ? video.play() : video.pause;
        },
        { threshold: [0.6] }
      );

      observer.observe(postMainElement);
    }
  }, []);

  return (
    <>
      <div id={`PostMain-${post.id}`} className="flex border-b py-6">
        {/* <div className="cursor-pointer">
          <img
            src={post.profile.image}
            alt=""
            className="rounded-full max-h-[60px]"
            width={60}
          />
        </div> */}

        <div className="pl-3 w-full px-4">
          {/* <div className="flex items-center justify-between pb-0.5">
            <Link href={`/profile/${post.profile.user_id}`}>
              <span className="font-bold hover:underline cursor-pointer">
                {post.profile.name}
              </span>
            </Link>

            <button className="border txt-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#FFEEF2] font-semibold rounded-md">
              Follow
            </button>
          </div>

          <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
            {post.text}
          </p>
          <p className="text-[14px] text-gray-500 pb-0.5">
            #fun #cool #superawesome
          </p>
          <p className="text-[14px] pb-0.5 flex items-center font-semibold">
            <ImMusic size="17" />
            <span className="px-1">Original Sound - Awesome</span>
            <AiFillHeart size="20" />
          </p> */}

          <div className="mt-2.5 flex">
            <div className="relative min-h-[480px] max-h-[880px] max-w-[300px] flex items-center bg-black rounded-xl cursor-pointer">
              <video
                src={post.video_url}
                id={`video-${post.id}`}
                loop
                controls
                muted
                className="rounded-xl object-cover mx-auto h-full"
              />

              <img
                className="absolute right-2 bottom-20"
                src="/images/tiktok-logo-white.png"
                alt=""
                width={"90"}
              />

              <div className="absolute bottom-4 px-5">
                <Link href={`/profile/${post.profile.user_id}`}>
                  <span className="font-semibold hover:underline cursor-pointer text-white text-[14px]">
                    {post.profile.name}
                  </span>
                </Link>
                <p className="text-[14px] break-words md:max-w-[400px] max-w-[300px] text-white">
                  {post.text}
                </p>
                <p className="text-[14px] text-white">
                  #fun #cool #superawesome
                </p>
                <p className="text-[14px] flex items-center text-white">
                  <ImMusic size="10" className="" />
                  <span className="px-1">Original Sound - Awesome</span>
                  <AiFillHeart size="10" />
                </p>

                {/* <button className="border txt-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#FFEEF2] font-semibold rounded-md">
                  Follow
                </button> */}
              </div>
            </div>

            <PostMainLike post={post} />
          </div>
        </div>
      </div>
    </>
  );
}

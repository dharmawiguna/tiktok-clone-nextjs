"use client";

import React from "react";
import { useEffect } from "react";
import ClientOnly from "./components/ClientOnly";
import PostMain from "./components/PostMain";
import MainLayout from "./layouts/MainLayout";
import { usePostStore } from "./stores/post";

export default function Home() {
  let { allPost, setAllPosts } = usePostStore();

  useEffect(() => {
    setAllPosts();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w-[calc(100%-90px)] max-w-[690px] ml-auto">
          <ClientOnly>
            {allPost.map((post, index) => (
              <PostMain key={index} post={post} />
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}

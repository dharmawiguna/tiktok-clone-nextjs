import { CommentsType, SingleCommentType } from "@/app/types";
import ClientOnly from "../ClientOnly";
import Link from "next/link";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

export default function SingleComment({ comment, params }: SingleCommentType) {
  const [isDeleting, setIsDeleteing] = useState<boolean>(false);

  const deleteThisComment = () => {
    let res = confirm("are you sure you want to delete this comment?");
    if (!res) return;

    // do something
  };
  return (
    <>
      <div
        id="SingleComment"
        className="flex items-center justify-between px-8 mt-4"
      >
        <div className="flex items-center relative w-full">
          <Link href={`/profile/${comment.profile.user_id}`}>
            <img
              className="absolute top-0 rounded-full lg:mx-0 mx-auto"
              width={40}
              src={comment.profile.image}
            />
          </Link>
          <div className="ml-14 pt-0.5 w-full">
            <div className="text-[18px] font-semibold flex items-center justify-between">
              <span className="flex items-center">
                {comment.profile.name} -{" "}
                <span className="text-[12px] text-gray-600 font-light ml-1">
                  {comment.created_at}
                </span>
              </span>

              {true ? (
                <button
                  disabled={isDeleting}
                  onClick={() => deleteThisComment()}
                >
                  {isDeleting ? (
                    <BiLoaderCircle
                      className="animate-spin"
                      color="#E91E62"
                      size={20}
                    />
                  ) : (
                    <BsTrash className="cursor-pointer" size={25} />
                  )}
                </button>
              ) : null}
            </div>

            <p className="text-[15px] font-light">{comment.text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

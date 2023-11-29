"use client";
import { postsAtom } from "@/lib/atoms";
import getPosts from "@/lib/utils/get-posts";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import EditOrDeletePost from "./edit-or-delete-post";
import { Card, CardFooter, CardHeader } from "./ui/card";

export const apiRoute = process.env.NEXT_PUBLIC_API;

export default function Posts() {
  const [posts, setPosts] = useAtom(postsAtom);
  const username = (useSession()?.data as any)?.apiResponse?.username;
  getPosts().then((posts) => setPosts(posts as any));
  return posts?.length ? (
    posts
      .slice()
      .reverse()
      .map((post: any) => (
        <Card className="w-[90%] md:w-[50%]" key={post.id}>
          <CardHeader>
            <Image
              className="max-h-96 mx-auto object-contain"
              src={post.image}
              height={500}
              width={600}
              alt={"Post by " + post.username + " could not load"}
            />
          </CardHeader>
          <CardFooter className="space-y-4 flex flex-col items-start">
            <p className="my-4">{post.description}</p>
            <p className="my-4 italic font-thin">
              By{" "}
              <span className="font-bold text-blue-900">{post.username}</span>
            </p>
            {username === post.username && (
              <EditOrDeletePost {...{ id: post.id }} />
            )}
          </CardFooter>
        </Card>
      ))
  ) : (
    <h1 className="w-[70%] text-center text-xl capitalize">
      No posts made yet. Click on Add Post to add the first post!
    </h1>
  );
}

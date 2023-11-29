import { apiRoute } from "@/components/posts";
import requests from "./requests";

export default async () => {
  const posts = await fetch(apiRoute + "/posts/").then((res) => {
    if (res.status >= 400) return null;
    return res.json();
  });
  return Promise.all(
    posts?.map((post: any) =>
      requests(`${apiRoute}/users/${post?.author}/`, "GET", null).then(
        (user) => {
          post.username = user.username;
          return post;
        }
      )
    )
  );
};

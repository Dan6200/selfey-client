import requests from "@/lib/utils/requests";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";

export default async function Posts() {
  const posts = await requests(
    process.env.NEXT_PUBLIC_API + "/posts/",
    "GET",
    null,
    (error) => console.error("Error fetching resource", error)
  );
  const user = await requests(
    process.env.NEXT_PUBLIC_API + "/users/" + posts?.[0]?.author,
    "GET",
    null,
    (error) => console.error("Error fetching resource", error)
  );
  console.log("Post " + posts);
  console.log("User " + user);
  return (
    <section className="flex flex-col items-center space-y-12">
      {posts &&
        posts.map((post: any, index: number) => (
          <Card className="w-[90%] sm:w-[40%]" key={index}>
            <CardHeader>
              <Image
                src={post.image}
                height={800}
                width={800}
                alt={"Post by " + user.username + " could not load"}
              />
            </CardHeader>
            <CardFooter className="flex flex-col items-start">
              <p className="my-4">{post.description}</p>
              <p className="my-4 italic font-thin">By {user.username}</p>
            </CardFooter>
          </Card>
        ))}
    </section>
  );
}

import authOptions from "@/lib/utils/authOptions";
import requests from "@/lib/utils/requests";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";

export default async function Posts() {
  const session = await getServerSession(authOptions);
  const posts = await requests(
    process.env.NEXT_PUBLIC_API + "/posts/",
    "GET",
    null,
    (error) => console.error("Error fetching resource", error)
  );
  const username = (
    await requests(
      process.env.NEXT_PUBLIC_API + "/users/" + posts[0].author,
      "GET",
      null,
      (error) => console.error("Error fetching resource", error)
    )
  ).username;
  return (
    <section className="flex flex-col mb-16 items-center space-y-12">
      <Card className="w-[90%] md:w-[50%]">
        <CardHeader>
          <Image
            src="/Koenigsegg.jpg"
            height={800}
            width={800}
            alt={"A lambo"}
          />
        </CardHeader>
        <CardFooter className="flex flex-col items-start">
          <p className="my-4">A beauty 😍</p>
          <p className="my-4 italic font-thin">
            By{" "}
            <span className="font-bold text-blue-900">
              your_cool_programmer
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="w-[90%] md:w-[50%]">
        <CardHeader>
          <Image src="/Lamb.jpg" height={800} width={800} alt={"A lambo"} />
        </CardHeader>
        <CardFooter className="flex flex-col items-start">
          <p className="my-4">Scenery 🏔️</p>
          <p className="my-4 italic font-thin">
            By{" "}
            <span className="font-bold text-blue-900">
              your_cool_programmer
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="w-[90%] md:w-[50%]">
        <CardHeader>
          <Image
            src="/Bentley.jpg"
            height={800}
            width={800}
            alt={"A bentley"}
          />
        </CardHeader>
        <CardFooter className="flex flex-col items-start">
          <p className="my-4">Live a life of luxury 🥂</p>
          <p className="my-4 italic font-thin">
            By{" "}
            <span className="font-bold text-blue-900">
              your_cool_programmer
            </span>
          </p>
        </CardFooter>
      </Card>
      {posts &&
        posts.map((post: any, index: number) => (
          <Card className="w-[90%] md:w-[50%]" key={index}>
            <CardHeader>
              <Image
                src={post.image}
                height={800}
                width={800}
                alt={"Post by " + username + " could not load"}
              />
            </CardHeader>
            <CardFooter className="flex flex-col items-start">
              <p className="my-4">{post.description}</p>
              <p className="my-4 italic font-thin">
                By <span className="font-bold text-blue-900">{username}</span>
              </p>
            </CardFooter>
          </Card>
        ))}
    </section>
  );
}

import requests from "@/lib/utils/requests";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";

export default async function Posts({ posts }: any) {
  // const posts = await requests(
  //   process.env.NEXT_PUBLIC_API + "/posts/",
  //   "GET",
  //   null,
  //   (error) => console.error("Error fetching resource", error)
  // );
  const usernames = await posts?.map(
    async (post: any) =>
      (
        await requests(
          process.env.NEXT_PUBLIC_API + "/users/" + post?.author,
          "GET",
          null,
          (error) => console.error("Error fetching resource", error)
        )
      )?.username
  );
  return (
    <section className="flex flex-col mb-16 items-center space-y-12">
      {posts?.reverse().map((post: any, index: number) => (
        <Card className="w-[90%] md:w-[50%]" key={index}>
          <CardHeader>
            <Image
              src={post.image}
              height={800}
              width={800}
              alt={"Post by " + usernames?.[index] + " could not load"}
            />
          </CardHeader>
          <CardFooter className="flex flex-col items-start">
            <p className="my-4">{post.description}</p>
            <p className="my-4 italic font-thin">
              By{" "}
              <span className="font-bold text-blue-900">
                {usernames?.[index]}
              </span>
            </p>
          </CardFooter>
        </Card>
      ))}
      <Card className="w-[90%] md:w-[50%]">
        <CardHeader>
          <Image
            src="/Koenigsegg.jpg"
            height={800}
            width={800}
            alt={"A Koenigsegg"}
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
    </section>
  );
}

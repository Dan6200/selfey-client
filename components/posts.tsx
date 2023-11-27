import authOptions from "@/lib/utils/authOptions";
import requests from "@/lib/utils/requests";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";

export default async function Posts() {
  const session = getServerSession(authOptions);
  const username = (session as any).data?.apiResponse?.username;
  const posts = await requests(
    process.env.NEXT_PUBLIC_API + "/posts/",
    "GET",
    null,
    (error) => console.error("Error fetching resource", error)
  );
  return (
    <section className="flex flex-col items-center space-y-12">
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
          <p className="my-4 italic font-thin">By your_cool_programmer</p>
        </CardFooter>
      </Card>
      <Card className="w-[90%] md:w-[50%]">
        <CardHeader>
          <Image src="/Lamb.jpg" height={800} width={800} alt={"A lambo"} />
        </CardHeader>
        <CardFooter className="flex flex-col items-start">
          <p className="my-4">Scenery 🏔️</p>
          <p className="my-4 italic font-thin">By your_cool_programmer</p>
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
          <p className="my-4 italic font-thin">By your_cool_programmer</p>
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
              <p className="my-4 italic font-thin">By {username}</p>
            </CardFooter>
          </Card>
        ))}
    </section>
  );
}

import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";

export default async function Posts() {
  const posts = await fetch(process.env.NEXT_PUBLIC_API + "/posts/", {
    next: { revalidate: 60 * 60 },
  }).then((res) => {
    //if (res.status >= 400) return null;
    return res.json();
  });
  const user = await fetch(
    process.env.NEXT_PUBLIC_API + "/users/" + posts?.[0]?.author,
    {
      next: { revalidate: 60 * 60 },
    }
  ).then((res) => {
    //if (res.status >= 400) return null;
    return res.json();
  });
  console.log(posts);
  console.log(user);
  return (
    <section className="flex flex-col items-center space-y-12">
      {posts &&
        posts.map((post: any, index: number) => (
          <Card className="w-[90%] sm:w-[60%]" key={index}>
            <CardHeader>
              <Image
                src={post.image}
                height={800}
                width={800}
                alt={post.description}
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

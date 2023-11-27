import Posts from "@/components/posts";

export default async function Home() {
  const posts = await fetch(process.env.NEXT_PUBLIC_API + "/posts/", {
    next: { revalidate: 5 },
  }).then((res) => {
    if (res.status >= 400) return null;
    return res.json();
  });
  return <Posts {...{ posts }} />;
}

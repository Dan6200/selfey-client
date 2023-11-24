"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function AddPost() {
  const { register, handleSubmit } = useForm();

  const submitHandler = (data: any) => {
    const formData = new FormData();
    console.log(data);
    const { image, description } = data;
    formData.append("image", image[0]);
    formData.append("description", description);
    formData.append("author", "1");
    fetch(process.env.NEXT_PUBLIC_API + "/posts/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Upload success:", result);
      })
      .catch((error) => {
        console.error("Upload error:", error);
      });
  };

  return (
    <section className="flex flex-col items-center">
      <Card className="w-[90%] h-96 p-16">
        <CardHeader>
          <form
            className="flex flex-col h-64 justify-between"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex flex-col space-y-4 h-48">
              <input type="file" {...register("image")} />
              <div className="flex flex-col h-32 space-y-4">
                <label className="font-bold">Caption</label>
                <Textarea
                  placeholder="Tell us more about the image"
                  {...register("description")}
                ></Textarea>
              </div>
            </div>
            <Button type="submit">Post</Button>
          </form>
        </CardHeader>
      </Card>
    </section>
  );
}

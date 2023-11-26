"use client";
import requests from "@/lib/utils/requests";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function AddPost() {
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data: any) => {
    const formData = new FormData();
    const { image, description } = data;
    formData.append("image", image[0]);
    formData.append("description", description);
    formData.append("author", "1");
    const result = await requests(
      process.env.NEXT_PUBLIC_API + "/posts/",
      "POST",
      formData,
      (error) => console.error("Upload error:", error)
    );
    console.log("Upload success: ", result);
  };

  return (
    <section className="flex flex-col items-center">
      <Card className="w-[90%] md:w-[50%] h-96 p-16">
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

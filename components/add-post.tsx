"use client";
import requests from "@/lib/utils/requests";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function AddPost() {
  const { register, handleSubmit } = useForm();
  const session = useSession();
  const router = useRouter();
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = (webcamRef as any).current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);
  const submitHandler = async (router: any, data: any) => {
    const formData = new FormData();
    const { image, description } = data;
    formData.append("image", image[0]);
    formData.append("description", description);
    const result = await requests(
      process.env.NEXT_PUBLIC_API +
        "/posts/" +
        (session as any)?.data?.apiResponse?.user_id,
      "POST",
      formData,
      (error) => console.error("Upload error:", error)
    );
    router.push("/");
  };

  return (
    <section className="flex flex-col items-center">
      <Card className="w-[90%] md:w-[50%] h-[56rem] p-16">
        <CardHeader>
          <Webcam
            className="mb-8"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <Button className="mb-8" onClick={capture}>
            Capture photo
          </Button>
          <form
            className="flex flex-col h-64 justify-between"
            onSubmit={handleSubmit(submitHandler.bind(null, router))}
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

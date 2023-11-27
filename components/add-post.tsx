"use client";
import convB64ToBlob from "@/lib/utils/conv-b64-to-blob";
import requests from "@/lib/utils/requests";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
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
  const [formData, setFormData] = useState(new FormData());
  console.log(session.data);

  const capture = useCallback(() => {
    const capturedImageSrc = (webcamRef as any).current?.getScreenshot();
    const b64Img = capturedImageSrc.slice(capturedImageSrc.indexOf(",") + 1);
    formData.append("image", convB64ToBlob(b64Img) as any);
    setFormData(formData);
  }, [webcamRef]);

  const submitHandler = async (router: any, data: any) => {
    const { image, description } = data;
    try {
      if (image.length != 0) formData.append("image", image[0]);
      formData.append("description", description);
      formData.append("author", (session as any)?.data?.apiResponse?.id);
      console.log(formData);
      const result = await requests(
        process.env.NEXT_PUBLIC_API + "/posts/",
        "POST",
        formData,
        (error) => {
          throw error;
        }
      );
      router.push("/");
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <Card className="w-[90%] md:w-[50%] p-16">
        <CardHeader className="space-y-8">
          <Webcam
            className=""
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <Button className="" onClick={capture}>
            Capture photo
          </Button>
          <h3 className="text-2xl">Or Upload a photo</h3>
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

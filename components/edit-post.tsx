"use client";
import Image from "next/image";
import { postsAtom } from "@/lib/atoms";
import convB64ToBlob from "@/lib/utils/conv-b64-to-blob";
import requests from "@/lib/utils/requests";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { apiRoute } from "./posts";
import { Loader2 } from "lucide-react";

export default function EditPost() {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const session = useSession();
  const username = (session as any)?.data?.apiResponse?.username;
  const router = useRouter();
  const webcamRef = useRef(null);
  const [formData, setFormData] = useState(new FormData());
  const [capturedImgSrc, setCapturedImgSrc] = useState("");
  const post: any = useAtomValue(postsAtom).find((post: any) => post?.id == id);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!post) {
      router.push("/");
    }
    (async () => {
      const blob = await fetch(post?.image).then((res) => res.blob());
      const prevImg = new File(
        [blob as any],
        "picture-by-" + username + ".jpg",
        {
          type: "image/jpeg",
        }
      );
      formData.append("image", prevImg as any);
      formData.append("description", post?.description);
    })();
  }, []);

  const capture = useCallback(() => {
    const capturedImageSrc = (webcamRef as any).current?.getScreenshot();
    setCapturedImgSrc(capturedImageSrc); // why is this not updating
    const b64Img = capturedImageSrc.slice(capturedImageSrc.indexOf(",") + 1);
    const blob = convB64ToBlob(b64Img);
    const file = new File([blob as any], "picture-by-" + username + ".jpg", {
      type: "image/jpeg",
    });
    formData.append("image", file);
    setFormData(formData);
  }, [webcamRef, formData, capturedImgSrc]);

  const submitHandler = async (router: any, data: any) => {
    if (submitting) return;
    setSubmitting(true);
    const { image, description } = data;
    try {
      if (image.length != 0) formData.append("image", image[image.length - 1]);
      formData.append("description", description);
      formData.append("author", (session as any)?.data?.apiResponse?.id);
      await requests(`${apiRoute}/posts/${id}/`, "PUT", formData);
      router.push("/");
    } catch (error) {
      console.error("Upload error:", error);
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-[90%] md:w-[50%] p-4 sm:p-8 md:p-16">
      <CardHeader className="space-y-8">
        <div className="flex w-full justify-between">
          <h3 className="text-lg capitalize">Previous post Image</h3>
          <Image
            width={300}
            height={300}
            className="w-32"
            src={post?.image}
            alt=""
          />
        </div>
        <h3 className="text-xl">Update Image</h3>
        <Webcam
          className=""
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <Button className="" onClick={capture}>
          Capture photo
        </Button>
        {capturedImgSrc && (
          <img src={capturedImgSrc} alt="capturedimg" className="w-16" />
        )}
        <h3 className="text-2xl">Or Upload a photo</h3>
        <form
          className="flex flex-col h-64 justify-between"
          onSubmit={handleSubmit(submitHandler.bind(null, router))}
        >
          <div className="flex flex-col space-y-4 h-48">
            <input type="file" {...register("image")} />
            <div className="flex flex-col h-32 space-y-4">
              <label className="font-bold">Update Caption</label>
              <Textarea
                placeholder="Tell us more about the image"
                defaultValue={post?.description}
                {...register("description")}
              ></Textarea>
            </div>
          </div>
          <div className="flex w-full space-y-4 md:space-y-0 md:justify-between flex-col md:flex-row">
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={
                !submitting ? "" : "hover:bg-foreground/60 bg-foreground/60"
              }
            >
              {submitting && <Loader2 className="animate-spin ml-2" />}
              Update Post
            </Button>
          </div>
        </form>
      </CardHeader>
    </Card>
  );
}

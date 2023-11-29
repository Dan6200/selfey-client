"use client";
import { postsAtom } from "@/lib/atoms";
import requests from "@/lib/utils/requests";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { apiRoute } from "./posts";
import { Button } from "./ui/button";

export default function EditOrDeletePost({ id }: { id: string }) {
  const deleteHandler = () =>
    requests(`${apiRoute}/posts/${id}/`, "DELETE", null);
  return (
    <div className="flex space-x-2">
      <Link href={"/edit-post/" + id}>
        <Button variant="outline">
          <Pencil2Icon className="w-8 h-8 text-foreground/70" />
        </Button>
      </Link>
      <Button variant="outline" onClick={deleteHandler}>
        <TrashIcon className="text-destructive w-8 h-8" />
      </Button>
    </div>
  );
}

"use client";

import { Button } from "@my-better-t-app/ui/components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@my-better-t-app/ui/components/card";
import { Input } from "@my-better-t-app/ui/components/input";
import { Label } from "@my-better-t-app/ui/components/label";
import { Loader2, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";


interface PostFormProps {
  onCreatePost: (title: string, content: string) => void;
  isPending: boolean;
}

export default function PostForm({ onCreatePost, isPending }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onCreatePost(title, content);
      setTitle("");
      setContent("");
    }
  };

  const isDisabled = isPending || !title.trim() || !content.trim();

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Post
        </CardTitle>
        <CardDescription>
          Add a new post to your collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter post content..."
                disabled={isPending}
              />
            </div>
          </div>
          <Button type="submit" disabled={isDisabled}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@my-better-t-app/ui/components/button";
import {
  Card,
  CardContent,
} from "@my-better-t-app/ui/components/card";
import { Input } from "@my-better-t-app/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@my-better-t-app/ui/components/table";
import { Textarea } from "@my-better-t-app/ui/components/textarea";
import { Edit2, Loader2, Trash2 } from "lucide-react";

function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string;
}

interface PostsTableProps {
  posts: Post[];
  isLoading: boolean;
  isEditing: boolean;
  editingPost: {
    id: number;
    title: string;
    content: string;
  } | null;
  onEdit: (post: Post) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  isUpdatePending: boolean;
}

export default function PostsTable({
  posts,
  isLoading,
  isEditing,
  editingPost,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onTitleChange,
  onContentChange,
  isUpdatePending,
}: PostsTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-muted-foreground text-center">
            <p className="text-lg font-medium">No posts yet</p>
            <p className="text-sm">Create your first post above</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              {isEditing && editingPost?.id === post.id ? (
                <InlineEditRow
                  post={post}
                  title={editingPost.title}
                  content={editingPost.content}
                  isPending={isUpdatePending}
                  onTitleChange={onTitleChange}
                  onContentChange={onContentChange}
                  onSave={onSaveEdit}
                  onCancel={onCancelEdit}
                />
              ) : isEditing && editingPost?.id === post.id ? (
                <InlineEditRow
                  post={post}
                  title={editingPost.title}
                  content={editingPost.content}
                  isPending={isUpdatePending}
                  onTitleChange={onTitleChange}
                  onContentChange={onContentChange}
                  onSave={onSaveEdit}
                  onCancel={onCancelEdit}
                />
              ) : (
                <ViewRow post={post} onEdit={() => onEdit(post)} onDelete={() => onDelete(post.id)} />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface InlineEditRowProps {
  post: Post;
  title: string;
  content: string;
  isPending: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

function InlineEditRow({
  post,
  title,
  content,
  isPending,
  onTitleChange,
  onContentChange,
  onSave,
  onCancel,
}: InlineEditRowProps) {
  const canSave = title.trim() && content.trim();

  return (
    <>
      <TableCell>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          disabled={isPending}
          className="h-8"
        />
      </TableCell>
      <TableCell>
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          disabled={isPending}
          className="h-8 min-h-[32px] resize-none"
        />
      </TableCell>
      <TableCell>{formatRelativeTime(post.createdAt)}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            onClick={onSave}
            disabled={isPending || !canSave}
          >
            <Loader2 className={`h-4 w-4 mr-1 animate-spin ${!isPending ? "hidden" : ""}`} />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </TableCell>
    </>
  );
}

interface ViewRowProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

function ViewRow({ post, onEdit, onDelete }: ViewRowProps) {
  return (
    <>
      <TableCell className="font-medium max-w-[200px] truncate">{post.title}</TableCell>
      <TableCell className="max-w-[300px] truncate text-muted-foreground">{post.content}</TableCell>
      <TableCell>{formatRelativeTime(post.createdAt)}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </>
  );
}

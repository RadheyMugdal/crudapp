"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import PaginationControls from "@/components/pagination-controls";
import PostForm from "@/components/post-form";
import PostsTable, { type Post } from "@/components/posts-table";
import SearchBar from "@/components/search-bar";
import { trpc } from "@/utils/trpc";

const POSTS_PER_PAGE = 5;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPost, setEditingPost] = useState<{ id: number; title: string; content: string } | null>(null);

  const posts = useQuery(trpc.post.getAll.queryOptions());

  const createMutation = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: () => {
        posts.refetch();
      },
    }),
  );

  const updateMutation = useMutation(
    trpc.post.update.mutationOptions({
      onSuccess: () => {
        posts.refetch();
        setEditingPost(null);
      },
    }),
  );

  const deleteMutation = useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: () => {
        posts.refetch();
      },
    }),
  );

  const filteredPosts = useMemo(() => {
    if (!posts.data) return [];
    if (!searchQuery.trim()) return posts.data;

    const query = searchQuery.toLowerCase();
    return posts.data.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );
  }, [posts.data, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCreatePost = (title: string, content: string) => {
    createMutation.mutate({ title, content });
  };

  const handleEditPost = (post: Post) => {
    setEditingPost({ id: post.id, title: post.title, content: post.content });
  };

  const handleSaveEdit = () => {
    if (editingPost && editingPost.title.trim() && editingPost.content.trim()) {
      updateMutation.mutate({ id: editingPost.id, title: editingPost.title, content: editingPost.content });
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleDeletePost = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <PostForm onCreatePost={handleCreatePost} isPending={createMutation.isPending} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
          <div className="text-sm text-muted-foreground">{filteredPosts.length} posts</div>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search posts by title or content..."
        />

        <PostsTable
          posts={paginatedPosts}
          isLoading={posts.isLoading}
          isEditing={editingPost !== null}
          editingPost={editingPost}
          onEdit={handleEditPost}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onDelete={handleDeletePost}
          onTitleChange={(title) => setEditingPost((prev) => prev ? { ...prev, title } : null)}
          onContentChange={(content) => setEditingPost((prev) => prev ? { ...prev, content } : null)}
          isUpdatePending={updateMutation.isPending}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredPosts.length}
          itemsPerPage={POSTS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

import { db } from "@my-better-t-app/db";
import { post } from "@my-better-t-app/db/schema/post";
import { eq } from "drizzle-orm";
import z from "zod";

import { router, publicProcedure } from "../index";

export const postRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(post);
  }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return await db.insert(post).values({
        title: input.title,
        content: input.content,
      });
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return await db.update(post).set({ title: input.title, content: input.content }).where(eq(post.id, input.id));
    }),

  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    return await db.delete(post).where(eq(post.id, input.id));
  }),
});

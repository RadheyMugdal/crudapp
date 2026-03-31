import { env } from "@my-better-t-app/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
export { eq } from "drizzle-orm";

import * as schema from "./schema";

export function createDb() {
  return drizzle(env.DATABASE_URL, { schema });
}

export const db = createDb();

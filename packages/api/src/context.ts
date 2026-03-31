import { auth } from "@my-better-t-app/auth";

type RequestWithHeaders = {
  headers: Headers;
};

export async function createContext(req: RequestWithHeaders) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  return {
    auth: null,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

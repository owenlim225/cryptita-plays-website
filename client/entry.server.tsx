import { renderToReadableStream } from "react-dom/server.edge";
import { ServerRouter, type EntryContext } from "react-router";
import { isbot } from "isbot";

export default async function handleRequest(
  request: Request,
  status: number,
  headers: Headers,
  context: EntryContext,
) {
  const body = await renderToReadableStream(
    <ServerRouter context={context} url={request.url} />,
    {
      signal: AbortSignal.timeout(10_000),
      onError(error: unknown) {
        status = 500;
        console.error(error);
      },
    },
  );
  if (isbot(request.headers.get("user-agent") || "")) await body.allReady;
  headers.set("Content-Type", "text/html; charset=utf-8");
  return new Response(request.method === "HEAD" ? null : body, { status, headers });
}

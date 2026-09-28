import NotFound from "../src/pages/NotFound";

export function loader() {
  return new Response(null, { status: 404 });
}

export function meta() {
  return [
    { title: "Page not found — Cryptita Plays" },
    { name: "robots", content: "noindex" },
  ];
}

export default NotFound;

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("donate", "./routes/donate.tsx"),
  route("faq", "./routes/faq.tsx"),
  route("who-we-are", "./routes/who-we-are.tsx"),
  route("engage", "./routes/engage.tsx"),
  route("terms", "./routes/terms.tsx"),
  route("privacy", "./routes/privacy.tsx"),
  route("cookies", "./routes/cookies.tsx"),
  route("404", "./routes/not-found.tsx"),
  route("*", "./routes/missing.tsx"),
] satisfies RouteConfig;

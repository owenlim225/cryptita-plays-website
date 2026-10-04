import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("contact", "./routes/contact.tsx"),
  route("donate", "./routes/donate.tsx"),
  route("faq", "./routes/faq.tsx"),
  route("who-we-are", "./routes/who-we-are.tsx"),
  route("engage", "./routes/engage.tsx"),
  route("initiatives", "./routes/initiatives.tsx"),
  route("partners", "./routes/partners.tsx"),
  route("initiatives/:slug", "./routes/initiative-detail.tsx"),
  route("stories", "./routes/stories.tsx"),
  route("stories/:slug", "./routes/story-detail.tsx"),
  route("terms", "./routes/terms.tsx"),
  route("privacy", "./routes/privacy.tsx"),
  route("cookies", "./routes/cookies.tsx"),
  route("404", "./routes/not-found.tsx"),
  route("*", "./routes/missing.tsx"),
] satisfies RouteConfig;

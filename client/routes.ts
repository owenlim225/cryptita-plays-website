import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("donate", "./routes/donate.tsx"),
  route("404", "./routes/not-found.tsx"),
  route("*", "./routes/missing.tsx"),
] satisfies RouteConfig;

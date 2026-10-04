import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import App from "./src/App";
import "./src/index.css";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#17131D" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/poppins/poppins-latin-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins/poppins-latin-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Meta />
        <Links />
      </head>
      <body>
        <App />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

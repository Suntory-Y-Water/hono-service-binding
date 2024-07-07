import { Hono } from "hono";

const app = new Hono().basePath("/http");

app.get("/", (c) => c.text("Hello Http Service Worker!"));

export default app;

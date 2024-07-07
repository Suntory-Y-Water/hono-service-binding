import { Hono } from "hono";
import type { RpcService } from "../../rpc-service/src";

type Bindings = {
  // Service Bindingの場合、Service<T>で使用する必要があります。
  RPC_SERVICE: Service<RpcService>;
  HTTP_SERVICE: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/rpc", async (c) => {
  // 呼び出し元が非同期関数ではなくても非同期扱いになる。
  const res = await c.env.RPC_SERVICE.add(1, 2);
  return c.text(`add result: ${res}`);
});

app.get("/http", async (c) => {
  const res = await c.env.HTTP_SERVICE.fetch(c.req.raw);
  const text = await res.text();
  return c.text(text);
});

export default app;

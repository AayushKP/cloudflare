import { Hono } from "hono";

const app = new Hono();

async function authMiddleware(c: any, next: any) {
  if (c.req.header("Autherization")) {
    await next();
  } else {
    return c.text("You don't have access");
  }
}

app.use(authMiddleware);

app.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    console.log(body);
  } catch (err) {
    console.error("Invalid JSON or empty body");
    return c.text("Invalid JSON input", 400); // Return an error response
  }

  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text("Hello Hono!");
});

export default app;

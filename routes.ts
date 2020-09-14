import { Router } from "./deps.ts";
import books from "./books.ts";

const router = new Router();

router
  .get("/", (context) => {
    console.log("home page");
    context.response.body = "Hello world!";
  })
  .get("/book", (context) => {
    console.log("book page");
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      console.log(`book ${context.params.id} page`);
      context.response.body = books.get(context.params.id);
    }
  });

export default router;

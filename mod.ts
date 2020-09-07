import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});
books.set("2", {
  id: "2",
  title: "The Mosquito: A Human History of Our Deadliest Predator",
  author: "Timothy C. Winegard",
});

export class OakServer {
  private readonly hostname: string;
  private readonly port: number;
  private readonly app: Application;

  constructor(hostname: string, port: number) {
    this.hostname = hostname;
    this.port = port;
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
    // Create the Oak Application
    this.app = new Application();
    // Create the User route and associate it with the Oak router
    // Associate the router with the application
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  async start(signal?: AbortSignal): Promise<void> {
    console.log(`server listening at ${this.port}`);
    let listenPromise: Promise<void>;
    if (signal) {
      listenPromise = this.app.listen({ hostname: this.hostname, port: this.port, signal });
      return listenPromise;
    } else {
      return await this.app.listen({ port: this.port });
    }
  }
}

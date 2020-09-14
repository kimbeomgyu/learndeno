import { Application } from "./deps.ts";
import router from "./routes.ts";

export class OakServer {
  private readonly hostname: string;
  private readonly port: number;
  private readonly app: Application;

  constructor(hostname: string, port: number) {
    this.hostname = hostname;
    this.port = port;

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

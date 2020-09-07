import { OakServer } from "./mod.ts";

const hostname = "localhost";
const port = 8000;

await new OakServer(hostname, port).start();

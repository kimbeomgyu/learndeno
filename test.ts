import { OakServer } from "./mod.ts";
import { assertEquals, axiosd } from "./deps.ts";

const hostname = "localhost";
const port = 8000;
const httpUrl = `http://${hostname}:${port}`;

let abortController: AbortController;
let listenPromise: Promise<void>;

function startServer() {
  abortController = new AbortController();
  console.log("Starting test server");
  try {
    listenPromise = new OakServer(hostname, port).start(abortController.signal);
  } catch (err) {
    console.error(`Server can't start : ${err}`);
  }
}

async function stopServer() {
  abortController.abort();
  await listenPromise;
  console.log("server stop");
}

function afterAll() {
  stopServer();
}

async function beforeAll() {
  await startServer();
}

Deno.test("Get all books", async () => {
  await beforeAll();

  const response = await axiosd.get(`${httpUrl}/book`);
  const books = response.data;

  assertEquals(response.status, 200);
  assertEquals(books.length, 2);
  assertEquals(books[0]["id"], "1");
  assertEquals(books[0]["title"], "The Hound of the Baskervilles");
  assertEquals(books[0]["author"], "Conan Doyle, Arthur");
  assertEquals(books[1]["id"], "2");
  assertEquals(books[1]["title"], "The Mosquito: A Human History of Our Deadliest Predator");
  assertEquals(books[1]["author"], "Timothy C. Winegard");

  afterAll();
});

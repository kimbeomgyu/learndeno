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

const testBooks = [
  {
    id: "1",
    title: "The Hound of the Baskervilles",
    author: "Conan Doyle, Arthur",
  },
  {
    id: "2",
    title: "The Mosquito: A Human History of Our Deadliest Predator",
    author: "Timothy C. Winegard",
  },
];

Deno.test("Get all books", async () => {
  await beforeAll();

  const response = await axiosd.get(`${httpUrl}/book`);
  const books = response.data;

  assertEquals(response.status, 200);
  assertEquals(books.length, 2);
  assertEquals(books[0]["id"], testBooks[0]["id"]);
  assertEquals(books[0]["title"], testBooks[0]["title"]);
  assertEquals(books[0]["author"], testBooks[0]["author"]);
  assertEquals(books[1]["id"], testBooks[1]["id"]);
  assertEquals(books[1]["title"], testBooks[1]["title"]);
  assertEquals(books[1]["author"], testBooks[1]["author"]);

  afterAll();
});

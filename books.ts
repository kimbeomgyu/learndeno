interface Book {
  id: string;
  title: string;
  author: string;
}

const books = new Map<string, Book>();

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

export default books;

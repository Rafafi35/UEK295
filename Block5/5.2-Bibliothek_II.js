import express from "express";
import {v4 as uuidv4} from 'uuid';
const app = express()
const port = 3000

app.use(express.json());

let books = [
  { "isbn": "978-0-452-28423-4", "title": "1984", "year": 1949, "author": "George Orwell" },
  { "isbn": "978-3-423-13041-1", "title": "Der Vorleser", "year": 1995, "author": "Bernhard Schlink" },
  { "isbn": "978-3-15-018401-5", "title": "Faust. Der Tragödie erster Teil", "year": 1808, "author": "Johann Wolfgang von Goethe" },
  { "isbn": "978-3-257-06171-6", "title": "Siddhartha", "year": 1922, "author": "Hermann Hesse" },
  { "isbn": "978-3-442-47145-0", "title": "Der Schatten des Windes", "year": 2001, "author": "Carlos Ruiz Zafón" },
  { "isbn": "978-3-518-46968-2", "title": "Die Physiker", "year": 1962, "author": "Friedrich Dürrenmatt" },
  { "isbn": "978-0-7432-7356-5", "title": "The Kite Runner", "year": 2003, "author": "Khaled Hosseini" },
  { "isbn": "978-0-14-118776-1", "title": "To Kill a Mockingbird", "year": 1960, "author": "Harper Lee" },
  { "isbn": "978-3-518-46891-3", "title": "Homo Faber", "year": 1957, "author": "Max Frisch" },
  { "isbn": "978-3-596-51240-0", "title": "Die Vermessung der Welt", "year": 2005, "author": "Daniel Kehlmann" },
  { "isbn": "978-3-423-13927-8", "title": "Tschick", "year": 2010, "author": "Wolfgang Herrndorf" },
  { "isbn": "978-3-518-36492-5", "title": "Der Steppenwolf", "year": 1927, "author": "Hermann Hesse" },
  { "isbn": "978-0-452-28425-8", "title": "Brave New World", "year": 1932, "author": "Aldous Huxley" },
  { "isbn": "978-0-14-243723-0", "title": "Moby-Dick", "year": 1851, "author": "Herman Melville" },
  { "isbn": "978-0-14-044926-6", "title": "Die Brüder Karamasow", "year": 1880, "author": "Fjodor Dostojewski" }
];

app.get("/books", (req, res) => {
    res.send(books);
})

app.get("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    res.send(books.find(b => b.isbn === isbn))
})

app.post("/books", (req, res) => {
    const newBook = req.body;
    books = [...books, newBook]
    res.status(201).send(newBook)
})

app.put("/books/:isbn", (req, res) => {
    const updatedBook = req.body;
    books.push(updatedBook);
    res.status(200).send(updatedBook)
})

app.delete("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn
    const index = books.findIndex(b => b.isbn === isbn)
    if (index !== -1) {
    books.splice(index, 1)
    res.send("Book with " + isbn + " deleted")
    } else {
        res.status(404).send("Book with " + isbn + " not found.")
    }
})

app.patch("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn
  const updatedIsbn = req.body.isbn
  const updatedTitle = req.body.title
  const updatedYear = req.body.year
  const updatedAuthor = req.body.author

  const book = books.find(b => b.isbn === isbn)

  if (updatedIsbn) {
    book.isbn = updatedIsbn
  }
  if (updatedTitle) {
    book.title = updatedTitle
  }
  if (updatedYear) {
    book.year = updatedYear
  }
  if (updatedAuthor) {
    book.author = updatedAuthor
  }

  res.status(200).send("Book updated")
})

const lends = []

app.get("/lends", (req, res) => {
  res.send(lends)
})

app.get("/lends/:id", (req, res) => {
  const id = req.params.id
  res.send(lends.find(l => l.id === id))
})

app.post("/lends", (req, res) => {
  const id = uuidv4();
  const borrowed_at = new Date().toLocaleDateString("de-CH")
  res.set("Content-Type", "application/json")
  const { customer_id, isbn } = req.body;
  const borrowCount = lends.filter(l => l.customer_id === customer_id && returned_at === null).length - 1
  const newLend = {
    id,
    customer_id,
    isbn,
    borrowed_at,
    returned_at: null
  }

  if (!customer_id || !isbn) {
    res.status(422).send("customer_id and isbn have to be valid.")
  } else if (lends.find(l => l.isbn === isbn)) {
    res.status(400).send("Book is already borrowed.")
  } else if (borrowCount > 3) {
    res.status(400).send("The borrow-limit of 3 is reached")
  }
   else {
    lends.push(newLend);
    res.status(201).send(newLend)
  }
})

app.delete("/lends/:id", (req, res) => {
  const id = req.params.id
  const lend = lends.find(l => l.id === id)
  lend.returned_at = new Date().toLocaleDateString("de-CH")
  res.send("Book returned")
})

app.listen(port, () => {
    console.log("Port: " + port )
})
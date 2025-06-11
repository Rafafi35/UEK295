import express from "express";
const app = express()
const port = 3000

app.use(express.json());

const books = [{
    "isbn": "978-0-452-28423-4",
    "title": "1984",
    "year": 1949,
    "author": "George Orwell"
  },
  {
    "isbn": "978-3-423-13041-1",
    "title": "Der Vorleser",
    "year": 1995,
    "author": "Bernhard Schlink"
  },
  {
    "isbn": "978-3-15-018401-5",
    "title": "Faust. Der Tragödie erster Teil",
    "year": 1808,
    "author": "Johann Wolfgang von Goethe"
  },
  {
    "isbn": "978-3-257-06171-6",
    "title": "Siddhartha",
    "year": 1922,
    "author": "Hermann Hesse"
  },
  {
    "isbn": "978-3-442-47145-0",
    "title": "Der Schatten des Windes",
    "year": 2001,
    "author": "Carlos Ruiz Zafón"
  },
  {
    "isbn": "978-3-518-46968-2",
    "title": "Die Physiker",
    "year": 1962,
    "author": "Friedrich Dürrenmatt"
  }
]

app.get("/books", (req, res) => {
    res.send(books);
})

app.get("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    res.send(books.find(b => b.isbn === isbn))
})

app.post("/books", (req, res) => {
    const newBook = req.body;
    books.push(newBook);
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

app.listen(port, () => {
    console.log("Port: " + port )
})
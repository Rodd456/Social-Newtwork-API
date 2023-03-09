const express = require("express")
const db = require('./config/connection');
const routes = require("./routes")

const app = express()

const PORT = 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

// New route to get a list of books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});

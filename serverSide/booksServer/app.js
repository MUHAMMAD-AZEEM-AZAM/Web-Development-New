import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {body, validationResult} from 'express-validator'
import bodyParser from 'body-parser';
const app = express();
const MONGO_URL = 'mongodb+srv://credential@cluster0.goybwtg.mongodb.net/';
const MONGO_URL_BOOk= 'mongodb+srv://credential@cluster0.stvjsyv.mongodb.net/Books';

// // Middleware to enable CORS
app.use(cors()); //for use in differnet system
app.use(bodyParser.json());

// Middleware to parse JSON data
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

const bookSchema = new mongoose.Schema({
  title : {type : String, required: true},
  story : {type : String, required: true},
  image : {type : String, required: true},
  genres : {type : Array, required: true},
  level : {type : Number, required: true},
  color : {type : String, required: true},
});

// Create the Movie model with the correct collection name
const Book = mongoose.model('books', bookSchema)

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    // console.log('Books:', books);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/books', async (req, res) => {
  // Create a new book instance using the data from the request body
  const newBook = new Book({
    title: req.body.title,
    story: req.body.story,
    image: req.body.image,
    genres: req.body.genres,
    level: req.body.level,
    color: req.body.color
  });

  try {
    // Save the new book to the database
    const savedBook = await newBook.save();
    res.status(201).json('Scuessfully created book'+savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'+ error);
  }
});


app.delete('/books/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully', deletedBook });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/books/:id', async (req, res) => {
  const id = req.params.id;
  const updateData = req.body; // New data for the book

  try {
      // Find the book by ID and update it
      const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedBook) {
          return res.status(404).json({ message: 'Book not found' });
      }

      res.json({ message: 'Book updated successfully', updatedBook });
  } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

mongoose
  .connect(MONGO_URL_BOOk)
  .then(() => {
    app.listen(5000, () => {
      console.log('Connected to the database and listening on port', 5000);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // exit the process if the connection fails
  });


import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  console.log("Connected to MongoDB");
  
  const db = client.db("booktracker");
  const booksCollection = db.collection("books");
  
  app.get("/api/books", async (req, res) => {
    try {
      const books = await booksCollection.find().toArray();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  });

app.post("/api/books", async (req, res) => {
  try {
    const result = await booksCollection.insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

app.put("/api/books/:id", async (req, res) => {
  try {
    await booksCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );  
    res.json({ message: "Book item updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  try {
    await booksCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
}
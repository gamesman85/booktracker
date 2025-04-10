import express from "express";
import { MongoClient } from "mongodb";
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
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
}
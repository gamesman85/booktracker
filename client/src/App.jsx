import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div>
      <BookList books={data} />
    </div>
  )
}

export default App;
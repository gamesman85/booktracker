import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import LibraryFilter from "./components/LibraryFilter";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  function handleFilterChange(library) {
    if (library === null) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.library === library));
    }
  }

  return (
    <div>
      <h1>Book Tracker</h1>
      <LibraryFilter books={books} onFilterChange={handleFilterChange} />
      <BookList books={filteredBooks} />
    </div>
  );
}

export default App;
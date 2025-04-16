import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import LibraryFilter from "./components/LibraryFilter";
import BookAdder from "./components/BookAdder";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeLibrary, setActiveLibrary] = useState(null);

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

  useEffect(() => {
    if (activeLibrary === null) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.library === activeLibrary));
    }
  }, [books, activeLibrary]);

  function handleChangeFilter(library) {
    setActiveLibrary(library);
  }

  function handleAddBook(newBook) {
    setBooks([...books, newBook]);
  }

  function handleBooksDeleted(deletedBookIds) {{
    const updatedBooks = books.filter(book => !deletedBookIds.includes(book._id));
    setBooks(updatedBooks);
  }}

  return (
    <div>
      <h1>Book Tracker</h1>
      <LibraryFilter books={books} onFilterChange={handleChangeFilter} />
      <BookList books={filteredBooks} onBooksDeleted={handleBooksDeleted}/>
      <BookAdder onAddBook={handleAddBook} />
    </div>
  );
}

export default App;
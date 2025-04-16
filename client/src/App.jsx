import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import LibraryFilter from "./components/LibraryFilter";
import BookAdder from "./components/BookAdder";
import BookEditor from "./components/BookEditor";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeLibrary, setActiveLibrary] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

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

  function handleBooksDeleted(deletedBookIds) {
    const updatedBooks = books.filter(book => !deletedBookIds.includes(book._id));
    setBooks(updatedBooks);
  }

  function handleBookUpdate(bookId, updatedData) {
    // Update the books state with the updated book
    const updatedBooks = books.map(book => 
      book._id === bookId ? { ...book, ...updatedData } : book
    );
    setBooks(updatedBooks);
    
    // Close the editor
    setEditingBook(null);
  }

  return (
    <div>
      <h1>Book Tracker</h1>
      <LibraryFilter books={books} onFilterChange={handleChangeFilter} />
      <BookList 
        books={filteredBooks} 
        onBooksDeleted={handleBooksDeleted}
        onBookEdit={setEditingBook}
      />
      <BookAdder onAddBook={handleAddBook} />
      
      {editingBook && (
        <BookEditor 
          book={editingBook} 
          onSave={handleBookUpdate} 
          onCancel={() => setEditingBook(null)} 
        />
      )}
    </div>
  );
}

export default App;
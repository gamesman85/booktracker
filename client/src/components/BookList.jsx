import { useState } from 'react';
import axios from 'axios';

function BookList({ books, onBooksDeleted }) {
  const [selectedBooks, setSelectedBooks] = useState([]);

  function handleCheckBoxChange(bookId) {
    if(selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter(id => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  }

  async function handleDeleteSelected() {
    try {
      const deletePromises = selectedBooks.map(bookId => 
        axios.delete(`/api/books/${bookId}`)
      )
    
    await Promise.all(deletePromises);
    onBooksDeleted(selectedBooks);
    setSelectedBooks([]);
    } catch(error) {
      console.error("Could not delete books:", error);
    }
  }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Title</th>
              <th>Library</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book._id)}
                    onChange={() => handleCheckBoxChange(book._id)}
                  />
                </td>
                <td>{book._id}</td>
                <td>{book.title}</td>
                <td>{book.library}</td>
                <td>{book.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedBooks.length > 0 && (
          <div>
            <button onClick={handleDeleteSelected}>
              Delete selected books ({selectedBooks.length})
            </button>
          </div>
        )}
      </div>
    );
  }
  
  export default BookList;
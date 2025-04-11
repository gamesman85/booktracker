import { useState, useEffect } from 'react';

function LibraryFilter({ books, onFilterChange }) {
  const [libraries, setLibraries] = useState([]);
  
  useEffect(() => {
    if (books.length > 0) {
      const uniqueLibraries = [...new Set(books.map(book => book.library))].sort();
      setLibraries(uniqueLibraries);
    }
  }, [books]);
  
  function handleSubmit(e) {
    e.preventDefault();
    const library = e.target.library.value;
    onFilterChange(library === "All" ? null : library);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="library">Filter by Library: </label>
      <select id="library" name="library" defaultValue="All">
        <option value="All">All Libraries</option>
        {libraries.map(library => (
          <option key={library} value={library}>{library}</option>
        ))}
      </select>
      <button type="submit">Filter</button>
    </form>
  );
}

export default LibraryFilter;
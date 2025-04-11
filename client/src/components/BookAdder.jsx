import axios from 'axios';

function BookAdder({ onAddBook }) {
  async function addBookAction(formData) {
    try {
      const bookData = {
        title: formData.get("title"),
        library: formData.get("library"),
      };
      
      const response = await axios.post('/api/books', bookData);
      
      const newBook = {
        _id: response.data.id,
        ...bookData
      };
      
      onAddBook(newBook);
      
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  }

  return (
    <form action={addBookAction}>
      <input type="text" name="title" required placeholder="Book title" />
      <input type="text" name="library" required placeholder="Library name" />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookAdder;
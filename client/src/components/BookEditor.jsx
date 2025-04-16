import axios from 'axios';

function BookEditor({ book, onSave, onCancel }) {
  // Guard clause
  if (!book) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Error</h2>
          <p>Book data could not be loaded.</p>
          <button onClick={onCancel}>Close</button>
        </div>
      </div>
    );
  }

  // This is the correct way to handle form submissions in React 19
  async function updateBookAction(formData) {
    // Create a try/catch block to handle errors
    try {
      // Extract form values using FormData API
      const bookData = {
        title: formData.get("title"),
        library: formData.get("library"),
        dueDate: formData.get("dueDate")
      };
      
      // Make the API call
      await axios.put(`/api/books/${book._id}`, bookData);
      
      // Call the callback to update the UI
      onSave(book._id, bookData);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Book</h2>
        <form action={updateBookAction}>
          <div>
            <label htmlFor="title">Title:</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              defaultValue={book.title || ""} 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="library">Library:</label>
            <input 
              type="text" 
              id="library" 
              name="library" 
              defaultValue={book.library || ""} 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="dueDate">Due Date:</label>
            <input 
              type="date" 
              id="dueDate" 
              name="dueDate" 
              defaultValue={book.dueDate || ""} 
              required 
            />
          </div>
          
          <div className="modal-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookEditor;
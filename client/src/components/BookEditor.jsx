import { useState } from 'react';

function BookEditor({ book, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: book.title,
    library: book.library,
    dueDate: book.dueDate
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(book._id, formData);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="library">Library:</label>
            <input 
              type="text" 
              id="library" 
              name="library" 
              value={formData.library} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="dueDate">Due Date:</label>
            <input 
              type="date" 
              id="dueDate" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
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
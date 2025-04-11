function BookList({ books }) {
  
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Library</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.title}</td>
                <td>{book.library}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default BookList;
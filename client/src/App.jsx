import { useEffect } from 'react'

function App() {
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/books')
        const data = await response.json()
        console.log('Books fetched successfully:')
        console.log(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
    
    fetchBooks()
  }, [])

  return (
    <div>
      <h1>Backend Test</h1>
      <p>Check console for API results</p>
    </div>
  )
}

export default App 
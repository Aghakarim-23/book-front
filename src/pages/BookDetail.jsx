import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BookDetail = () => {
    const {id} = useParams()

    const [book, setBook] = useState(null)

 useEffect(() => {
       const getBook = async () => {
         try {
            const res = await axios.get(`https://book-app-h8qk.onrender.com/${id}`)
            setBook(res.data)
         } catch (error) {
            console.error(error)
         }
    }

    getBook()
 },[])

 if(!book) return <p>Loading...</p>
     
   return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book Details</h2>
      <p>
        <strong>Title:</strong> {book.title}
      </p>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Publish Year:</strong> {book.publishYear}
      </p>
    </div>
  );
}

export default BookDetail
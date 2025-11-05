import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const UpdateBook = () => {
const { id } = useParams()

const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });


  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}));
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.put(`https://book-app-h8qk.onrender.com/${id}`, formData);
      toast.success(res?.data?.message)
      
      navigate("/")
      
      console.log("Book updated:", res.data);

    } catch (error) {
      console.error("Error creating book:", error);
      toast.error(res?.data?.message)
    } finally{
        setLoading(false)
    }
  };


  useEffect(() => {
    const getBook = async () => {
        try {
            const res = await axios.get(`https://book-app-h8qk.onrender.com/${id}`)
            setFormData({
                title: res.data.title,
                author: res.data.author,
                publishYear: res.data.publishYear,
            })
            console.log(res.data)
        } catch (error) {
           console.error(error) 
        }
    }


    getBook()
  },[])


  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="publishYear"
          value={formData.publishYear}
          onChange={handleChange}
          placeholder="Publish Year"
          className="border px-3 py-2 rounded"
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;

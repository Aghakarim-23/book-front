import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}));
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("https://book-app-h8qk.onrender.com/createBook", formData);
        setLoading(true)
      toast.success(res.data.message)
      
      navigate("/")
      
      console.log("Book created:", res.data);

      setFormData({ title: "", author: "", publishYear: "" });
    } catch (error) {
      console.error("Error creating book:", error);
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Book</h2>
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
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:cursor-not-allowed
            `}
        >
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;

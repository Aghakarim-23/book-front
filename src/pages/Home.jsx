import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiEdit, CiCircleInfo } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { RiAddBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8001");
        setBooks(res.data.books);
        console.log(res.data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

const handleDeleteBook = async (id) => {

    try {
        const res = await axios.delete(`http://localhost:8001/${id}`)
        console.log(res)
        toast.success(res.data.message)
    } catch (error) {
        console.error(error)
    }

    
    setBooks(books.filter(book => book._id !== id))
}

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex gap-20 items-center">
          <h1 className="my-10 text-2xl">Books List</h1>
          <Link to={'/createBook'}>
              <RiAddBoxLine  className="text-blue-500 text-[24px] cursor-pointer"/>
          </Link>
      </div>
      {loading ?  <p>Loading...</p> : 
        <table className="max-w-[768px] w-full border-collapse border ">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Title</th>
            <th className="border">Author</th>
            <th className="border">Publish Year</th>
            <th className="border">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((t, index) => (
            <tr key={t._id} className="h-12">
              <td className="border ">{index + 1}</td>
              <td className="border ">{t.title}</td>
              <td className="border ">{t.author}</td>
              <td className="border ">{t.publishYear}</td>
              <td className={`flex h-12 items-center  justify-around ${index < books.length - 1 && "border-b" }`}>
                <Link to={`/book/${t._id}`} className="">
                    <CiCircleInfo className="text-green-600 text-[20px]"/>
                </Link>
                <Link to={`/updateBook/${t._id}`}>
                    <CiEdit className="text-yellow-500 text-[20px]" />
                </Link>
                <MdDeleteOutline className="text-red-600 text-[20px] cursor-pointer" onClick={() => handleDeleteBook(t._id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      }
    </div>
  );
};

export default Home;

import React from 'react'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import CreateBook from './pages/CreateBook'
import { ToastContainer } from 'react-toastify';
import UpdateBook from './pages/UpdateBook'


const App = () => {
  return (
    <Router>
      <ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createBook' element={<CreateBook/>}/>
        <Route path='/book/:id' element={<BookDetail/>}/>
        <Route path='/updateBook/:id' element={<UpdateBook/>}/>
      </Routes>
    </Router>
  )
}

export default App
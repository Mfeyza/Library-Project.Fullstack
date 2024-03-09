import "./App.css";
import BookList from "./components/BookList";
import NewBook from "./components/NewBook";
import axios from "axios";
import React from "react";
import {
  toastWarnNotify,
  toastErrorNotify,
  toastSuccessNotify,
} from "./helper/toastData";
import { ToastContainer } from "react-toastify"

function App() {
  const [books, setBooks] = React.useState([]);
  const [info, setInfo] = React.useState({
    title: "",
    author: "",
    ISBN: "",
    publicationYear: "",
    genre: "",
  });
  const [formData, setFormData] = React.useState({
    title: "",
    author: "",
    ISBN: "",
    publicationYear: "",
    genre: "",
    image: "",
  });

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(
        `https://book-fullstack-assignment.onrender.com/${id}`
      );
      toastSuccessNotify("Book has been deleted.");
      await getBooks();
    } catch (error) {
      toastErrorNotify("An error has been occured!")
    }
  };
  const getBooks = async () => {
    try {
      const response = await axios.get(
        "https://book-fullstack-assignment.onrender.com/"
      );
      setBooks(response.data.result.rows);
      console.log(response.data);
    } catch (error) {
      toastErrorNotify("An error has been occured!")
    }
  };
  const postBook = async () => {
    try {
      const response = await axios.post(
        "https://book-fullstack-assignment.onrender.com/",
        formData
      );
      toastSuccessNotify("Book has been added.");
      setBooks([...books, response.data.result]);
      return response;
    } catch (error) {
      toastErrorNotify("An error has been occured!")
    }
  };
  return (
    <>
      <NewBook
        postBook={postBook}
        formData={formData}
        setFormData={setFormData}
      />
      <BookList
        deleteBook={deleteBook}
        getBooks={getBooks}
        books={books}
        setBooks={setBooks}
        setInfo={setInfo}
      />
      <ToastContainer />
    </>
  );
}

export default App;

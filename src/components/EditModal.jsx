import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { CardActions, CardContent } from "@mui/material";

import { toastErrorNotify, toastSuccessNotify } from "../helper/toastData";
import axios from "axios";
export default function EditModal({
  open,
  handleClose,
  info,
  setInfo,
  getBooks,
}) {
  const [editState, setEditState] = React.useState({
    title: "",
    author: "",
    ISBN: "",
    publicationYear: "",
    genre: "",
  });
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    minHeight: "500px",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    console.log(info);
    setEditState(info);
  }, [info]);

  if (!info) return;
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditState({ ...editState, [name]: value });
  };

  const putBook = async (id) => {
    try {
      const response = await axios.put(
        `https://book-fullstack-assignment.onrender.com/${id}`,
        editState
      );
      toastSuccessNotify("Book has been updated.");
      getBooks();
      return response;
    } catch (error) {
      toastErrorNotify("An error has been occured!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo(editState);

    putBook(editState.id);
    handleClose();
  };

  return (
    <div>
      <Modal
        sx={modalStyle}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "white",
            opacity: 0.5,
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                name="title"
                label="Book Title"
                value={editState?.title}
                onChange={handleChange}
              />
              <TextField
                name="author"
                label="Author"
                value={editState?.author}
                onChange={handleChange}
              />
              <TextField
                name="ISBN"
                label="ISBN"
                value={editState?.ISBN}
                onChange={handleChange}
              />
              <TextField
                name="publicationYear"
                label="Publication Year"
                type="number"
                value={editState?.publicationYear}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="genre"
                label="Genre"
                type="text"
                value={editState?.genre}
                onChange={handleChange}
              />
              <TextField
                name="image"
                label="Image URL"
                type="url"
                value={editState?.image}
                onChange={handleChange}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" type="submit">
              Update Book
            </Button>
            <Button
              size="small"
              color="primary"
              type="button"
              onClick={handleClose}
            >
              Close
            </Button>
          </CardActions>
        </form>
      </Modal>
    </div>
  );
}

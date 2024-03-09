import React, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "./EditModal";
import Box from "@mui/material/Box";


const BookList = ({ getBooks, books, setBooks, deleteBook, setInfo }) => {
  const [selectedId, setSelectedId] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setInfo({
      title: "",
      author: "",
      ISBN: "",
      publicationYear: "",
      genre: "",
    });
  };

  React.useEffect(() => {
    getBooks();
  }, [getBooks]);

  const handleDelete = (id) => {
    deleteBook(id);
  };

  const getRowId = (row) => row.id;

  const columns = [
    {
      field: "image",
      headerName: "Image",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <img
          src={params.value}
          alt="bookImage"
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => new Date(row.createdAt).toLocaleString("de-DE"),
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "author",
      headerName: "Author",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "genre",
      headerName: "Genre",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ISBN",
      headerName: "ISBN",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "publicationYear",
      headerName: "Publicatiob Year",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { id } }) => {
        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleOpen(id)}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(id)}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <EditModal
        open={open}
        handleClose={handleClose}
        info={books && books.find((item) => item.id === selectedId)}
        setInfo={setInfo}
        getBooks={getBooks}
      />
      <Box sx={{ width: "60%", margin: "auto", mt: 4 }}>
        <DataGrid
          className="table"
          autoHeight
          rows={books}
          columns={columns}
          pageSizeOptions={[20, 50, 75, 100]}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          getRowId={getRowId}
          sx={{
            borderColor: "black",
            backgroundColor: "rgba(255, 255, 255, 0.603)",
            "& .MuiDataGrid-row": {
              color: "black",
              fontWeight: "bold",
              borderBottom: "1px solid black",
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "black",

              borderBottom: "1px solid black",
            },
            "& .MuiButtonBase-root": {
              color: "black",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              color: "black",
              borderColor: "black",
            },
          }}
        />
      </Box>
    </>
  );
};

export default BookList;

// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';

// export default function BookList() {
//     const [books, setBooks] = React.useState([]);
//     React.useEffect(() => {
//         const getBooks = async () => {
//           try {
//             const response = await axios.get('https://book-fullstack-assignment.onrender.com/');
//             setBooks(response.data.result.rows);
//             console.log(response.data)
//           } catch (error) {
//             console.error('GET isteğinde hata meydana geldi:', error);
//           }
//         };

//         getBooks();
//       }, []);
// // const deleteBook = async () => {
// //     try {
// //       const response = await axios.delete(`http://127.0.0.1:8000/${id}`);
// //       setBooks(response.data.result.rows);
// //     } catch (error) {
// //       console.error('DELETE isteğinde hata meydana geldi:', error);
// //     }
// //   };

// //   handleDelete =()=>{
// //     deleteBook(id)
// //   }

//   return (
//     <>
//       {books.map((item) => (
//         <Card sx={{ maxWidth: 345 }} key={item.id}>
//           <CardMedia
//             sx={{ height: 140 }}
//             image={item.image}
//             title="bookImage"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {item.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {item.author}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {item.genre}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {item.ISBN}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {item.publicationYear}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small" >Delete</Button>
//             <Button size="small">Edit</Button>
//           </CardActions>
//         </Card>
//       ))}
//     </>
//   );
// }

// import EditIcon from "@mui/icons-material/Edit"
// import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid"
// import Box from "@mui/material/Box"
// import React from "react"
// import axios from "axios"
// const PurchaseTable = ({ setInfo, handleOpen }) => {
//   const [books, setBooks] = React.useState([]);
//     React.useEffect(() => {
//         const getBooks = async () => {
//           try {
//             const response = await axios.get('https://book-fullstack-assignment.onrender.com/');
//             setBooks(response.data.result.rows);
//             console.log(response.data)
//           } catch (error) {
//             console.error('GET isteğinde hata meydana geldi:', error);
//           }
//         };

//         getBooks();
//       }, []);

//   const getRowId = (row) => row._id

//   const columns = [
//     {
//       field: "createdAt",
//       headerName: "Date",
//       minWidth: 150,
//       headerAlign: "center",
//       align: "center",
//       renderCell: ({ row }) => {
//         return new Date(row.createdAt).toLocaleString("de-DE")
//       },
//     },
//     {
//       field: "firmId",
//       headerName: "Firm",
//       flex: 1,
//       minWidth: 100,
//       headerAlign: "center",
//       align: "center",
//       renderCell: ({ row }) => row.books?.title,
//     },
//     {
//       field: "brandId",
//       headerName: "Brand",
//       flex: 1,
//       minWidth: 100,
//       headerAlign: "center",
//       align: "center",
//       renderCell: ({ row }) => row.books?.author,
//     },
//     {
//       field: "productID",
//       headerName: "Product",
//       flex: 1,
//       minWidth: 100,
//       headerAlign: "center",
//       align: "center",
//       renderCell: ({ row }) => books?.genre,
//     },
//     {
//       field: "quantity",
//       headerName: "Quantity",
//       minWidth: 50,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       minWidth: 50,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "amount",
//       headerName: "Amount",
//       minWidth: 50,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       minWidth: 40,
//       headerAlign: "center",
//       align: "center",
//       renderCell: ({
//         row: { brandId, productId, quantity, price, firmId, _id },
//       }) => {
//         return [
//           <GridActionsCellItem
//             key={"edit"}
//             icon={<EditIcon />}
//             label="Edit"
//             onClick={() => {
//               handleOpen()
//               setInfo({ _id, brandId, productId, quantity, price, firmId })
//             }}

//           />,
//           <GridActionsCellItem
//             key={"delete"}

//             label="Delete"

//           />,
//         ]
//       },
//     },
//   ]
//   return (
//     <Box sx={{ width: "100%", mt: 4 }}>
//       <DataGrid
//       className="table"
//         autoHeight

//         columns={columns}
//         pageSizeOptions={[20, 50, 75, 100]}
//         disableRowSelectionOnClick
//         // getRowId={(row) => row._id}
//         slots={{ toolbar: GridToolbar }}
//         sx={{
//           borderColor: 'black',
//           '& .MuiDataGrid-row': {
//             color: 'black',
//             borderBottom: '1px solid black'
//           },
//           '& .MuiDataGrid-columnHeaders': {
//             color: 'black',

//             borderBottom: '1px solid black'
//           },
//           '& .MuiDataGrid-cell': {
//             color: 'black',
//             borderColor: 'black'
//           }
//         }}
//       />
//     </Box>
//   )
// }

// export default PurchaseTable

import React, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "./EditModal";
import Box from "@mui/material/Box";
import axios from "axios";

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
  }, []);

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

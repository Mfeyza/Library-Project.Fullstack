import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function BookList() {
    const [books, setBooks] = React.useState([]);
    React.useEffect(() => {
        const getBooks = async () => {
          try {
            const response = await axios.get('https://book-fullstack-assignment.onrender.com/');
            setBooks(response.data.result.rows);
          } catch (error) {
            console.error('GET isteğinde hata meydana geldi:', error);
          }
        };
    
        getBooks(); 
      }, []);
// const deleteBook = async () => {
//     try {
//       const response = await axios.delete(`http://127.0.0.1:8000/${id}`);
//       setBooks(response.data.result.rows);
//     } catch (error) {
//       console.error('DELETE isteğinde hata meydana geldi:', error);
//     }
//   };

//   handleDelete =()=>{
//     deleteBook(id)
//   }

  return (
    <>
      {books.map((item) => (
        <Card sx={{ maxWidth: 345 }} key={item.id}> 
          <CardMedia
            sx={{ height: 140 }}
            image={item.image}
            title="bookImage"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.ISBN}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.publicationYear}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" >Delete</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
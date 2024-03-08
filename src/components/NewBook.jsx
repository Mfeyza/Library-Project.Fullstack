import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import genre from "../helper/data";


export default function MultiActionAreaCard() {
    const [formData, setFormData] = React.useState({
      title: '',
      author: '',
      ISBN: '',
      publicationYear: '',
      genre: '',
      image: ''
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(info => ({
        ...info,
        [name]: value
      }));
    };
  
    const handleSubmit = async () => {
      try {
        const response = await axios.post('https://book-fullstack-assignment.onrender.com/', formData);
        console.log(response.data);
       return response
      } catch (error) {
        console.error('POST isteğinde hat:', error);
      }
    };
  
    return (
      <Card sx={{ maxWidth: 345, mt: 5 }}>
         <form onSubmit={handleSubmit}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
              name="title"
              label="Book Title"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              name="author"
              label="Author"
              value={formData.author}
              onChange={handleChange}
            />
            <TextField
              name="ISBN"
              label="ISBN"
              value={formData.ISBN}
              onChange={handleChange}
            />
            <TextField
              name="publicationYear"
              label="Publication Year"
              type="number"
              value={formData.publicationYear}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Select
              name="genre"
              value={formData.genre}
              label="Genre"
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>Genre</em>
              </MenuItem>
              {genre.map((g, index) => (
                <MenuItem key={index} value={g}>{g}</MenuItem>
              ))}
            </Select>
            <TextField
              name="image"
              label="Image URL"
              type="url"
              value={formData.image}
              onChange={handleChange}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" type="submit">
            Add Book
          </Button>
        </CardActions>
        </form>
      </Card>
    );
  }
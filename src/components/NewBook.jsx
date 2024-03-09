import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions, Stack, TextField } from "@mui/material";

export default function NewBook({ postBook, formData, setFormData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((info) => ({
      ...info,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postBook();
    setFormData({
      title: "",
      author: "",
      ISBN: "",
      publicationYear: "",
      genre: "",
      image: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "",
      }}
    >
      <Stack>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Typography
            sx={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
          >
            BOOK STORE
          </Typography>
        </Box>
        <Card
          sx={{
            maxWidth: 345,
            mt: 5,
            backgroundColor: "rgba(255, 255, 255, 0.603)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
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
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
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
                  />
                </Box>
                <TextField
                  name="genre"
                  label="Genre"
                  type="text"
                  value={formData.genre}
                  onChange={handleChange}
                />

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
      </Stack>
    </Box>
  );
}

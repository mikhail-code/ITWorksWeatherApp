const express = require('express');
const app = express();
const port = 5000;

// Data to be served
const data = { message: "Totally real data from server message" };

// Route to serve the JSON data
app.get('/data', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

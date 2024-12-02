const express = require('express');
const cors = require('cors');
const mysql = require("mysql2");

const app = express();
const PORT = 8080;

// Create db connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "468161Ro@",
  database: "LibManageDB"
});


// Middleware Setup
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, this is a backend node server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

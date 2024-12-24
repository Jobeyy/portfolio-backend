const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

// Path to SQLite database file in the repository
const dbPath = path.join(__dirname, 'Experience.db');

// Initialize SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Route to fetch all projects data
app.get('/projects-data', async (req, res) => {
  db.all('SELECT * FROM Projects', (err, rows) => {
    if (err) {
      console.error('Error fetching projects data:', err.message);
      return res.status(500).send('Error fetching data from database');
    }
    res.json(rows);
  });
});

// Route to fetch all experience data
app.get('/experience-data', async (req, res) => {
  db.all('SELECT * FROM Experience', (err, rows) => {
    if (err) {
      console.error('Error fetching experience data:', err.message);
      return res.status(500).send('Error fetching data from database');
    }
    res.json(rows);
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

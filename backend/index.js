// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER || 'psql', //'postgres'
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'your_database',
  password: process.env.DB_PASSWORD ||  'psql',// 'postgres' 
  port: process.env.DB_PORT || 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!'); // You can customize the response here
  });


// API endpoint for creating a new item
app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting item:', error);
    res.status(500).json({ error: 'An error occurred while inserting the item.' });
  }
});

// API endpoint for getting all items
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the items.' });
  }
});

// API endpoint for updating an item
app.put('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'An error occurred while updating the item.' });
  }
});

// API endpoint for deleting an item
app.delete('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the item.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

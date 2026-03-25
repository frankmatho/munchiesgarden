require('dotenv').config();
const express = require('express');
const cors = require('cors');
const  pool  = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Create tables on startup
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS foods (
      id SERIAL PRIMARY KEY,
      food_title TEXT NOT NULL,
      image_url TEXT,
      food_description TEXT,
      category TEXT,
      price TEXT
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_info JSONB,
      items JSONB,
      status TEXT DEFAULT 'Preparing',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log('Tables ready.');
}

app.get('/', (req, res) => {
  res.send('Welcome to the Food Website API!');
});

// ──── FOODS ────

// Upload food
app.post('/upload-food', async (req, res) => {
  const { food_title, image_url, food_description, category, price } = req.body;
  const result = await pool.query(
    'INSERT INTO foods (food_title, image_url, food_description, category, price) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [food_title, image_url, food_description, category, price]
  );
  res.json(result.rows[0]);
});

// Get all foods (with optional category filter)
app.get('/all-foods', async (req, res) => {
  const { category } = req.query;
  const result = category
    ? await pool.query('SELECT * FROM foods WHERE category = $1', [category])
    : await pool.query('SELECT * FROM foods');
  res.json(result.rows);
});

// Get single food
app.get('/food/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM foods WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json(result.rows[0]);
});

// Update food
app.patch('/food/:id', async (req, res) => {
  const { food_title, image_url, food_description, category, price } = req.body;
  const result = await pool.query(
    `UPDATE foods SET food_title=$1, image_url=$2, food_description=$3, category=$4, price=$5
     WHERE id=$6 RETURNING *`,
    [food_title, image_url, food_description, category, price, req.params.id]
  );
  res.json(result.rows[0]);
});

// Delete food
app.delete('/food/:id', async (req, res) => {
  await pool.query('DELETE FROM foods WHERE id = $1', [req.params.id]);
  res.json({ message: 'Food deleted' });
});

// ──── ORDERS ────

// Create order
app.post('/orders', async (req, res) => {
  const { user, items, status, createdAt } = req.body;
  const result = await pool.query(
    'INSERT INTO orders (user_info, items, status) VALUES ($1, $2, $3) RETURNING *',
    [JSON.stringify(user), JSON.stringify(items), status || 'Preparing']
  );
  const row = result.rows[0];
  res.status(201).json({ _id: row.id, ...row }); // _id kept for frontend compatibility
});

// Get all orders
app.get('/orders', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  // Map to match what the frontend expects
  const orders = result.rows.map(r => ({
    _id: r.id,
    user: r.user_info,
    items: r.items,
    status: r.status,
    createdAt: r.created_at
  }));
  res.json(orders);
});

// Get single order (for polling in OrderProgress)
app.get('/orders/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  const r = result.rows[0];
  res.json({ _id: r.id, user: r.user_info, items: r.items, status: r.status });
});

// Update order status
app.patch('/orders/:id', async (req, res) => {
  const { status } = req.body;
  const result = await pool.query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
    [status, req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ message: 'Order not found' });
  res.json({ message: 'Order status updated' });
});

// Delete order
app.delete('/orders/:id', async (req, res) => {
  const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Order not found' });
  res.json({ message: 'Order deleted successfully' });
});

// Start server
initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

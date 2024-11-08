const db = require("./models/ConnectDatabase");
const { Router } = require("express");
const routes = Router();

routes.get("/", (request, response) => {
  console.log(request.query);
  response.json({ message: "Michel Abril Marinho" });
});

// THEME RPG 
// CRUD Routes for Characters

// Create a new character
routes.post('/characters', async (req, res) => {
  try {
      const { name, class: characterClass, weapon } = req.body;
      const sql = 'INSERT INTO `characters` (name, class, weapon) VALUES (?, ?, ?)';
      const result = await db.query(sql, [name, characterClass, weapon]);
      const insertId = result.insertId || result[0]?.insertId;
      res.status(201).json({ message: 'Character created successfully', characterId: insertId });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Read all characters
routes.get('/characters', async (req, res) => {
  try {
      const sql = 'SELECT * FROM `characters`';
      const result = await db.query(sql);
      res.json(result);  // Assuming `result[0]` holds the data
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Update a character by ID
routes.put('/characters/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { name, class: characterClass, weapon } = req.body;
      const sql = 'UPDATE `characters` SET name = ?, class = ?, weapon = ? WHERE id = ?';
      await db.query(sql, [name, characterClass, weapon, id]);
      res.json({ message: 'Character updated successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Delete a character by ID
routes.delete('/characters/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const sql = 'DELETE FROM `characters` WHERE id = ?';
      await db.query(sql, [id]);
      res.json({ message: 'Character deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// CRUD Routes for Powers

// Create a new power for a character
routes.post('/powers', async (req, res) => {
  try {
      const { name, type, damage, character_id } = req.body;
      const sql = 'INSERT INTO powers (name, type, damage, character_id) VALUES (?, ?, ?, ?)';
      const result = await db.query(sql, [name, type, damage, character_id]);
      const insertId = result.insertId || result[0]?.insertId;
      res.status(201).json({ message: 'Power created successfully', powerId: insertId });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Read all powers
routes.get('/powers', async (req, res) => {
  try {
      const sql = 'SELECT * FROM powers';
      const result = await db.query(sql);
      res.json(result);  // Assuming `result[0]` holds the data
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Update a power by ID
routes.put('/powers/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { name, type, damage } = req.body;
      const sql = 'UPDATE powers SET name = ?, type = ?, damage = ? WHERE id = ?';
      await db.query(sql, [name, type, damage, id]);
      res.json({ message: 'Power updated successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Delete a power by ID
routes.delete('/powers/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const sql = 'DELETE FROM powers WHERE id = ?';
      await db.query(sql, [id]);
      res.json({ message: 'Power deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = routes;

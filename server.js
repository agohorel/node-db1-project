const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const items = await find("accounts");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

server.get("/:id", async (req, res) => {
  try {
    const item = await findByID("accounts", req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

server.post("/", async (req, res) => {
  try {
    const newID = await insert("accounts", req.body);
    const newPost = await findByID("accounts", newID);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

server.put("/:id", async (req, res) => {
  try {
    await update("accounts", req.params.id, req.body);
    const updatedPost = await findByID("accounts", req.params.id);
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

server.delete("/:id", async (req, res) => {
  try {
    const deleted = await remove("accounts", req.params.id);
    res.status(200).json({ message: `successfully deleted ${deleted} items` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = server;

function find(table) {
  return db(table);
}

function findByID(table, id) {
  return db(table)
    .where({ id: Number(id) })
    .first();
}

function insert(table, content) {
  return db(table).insert(content);
}

function update(table, id, content) {
  return db(table)
    .where({ id: Number(id) })
    .update(content);
}

function remove(table, id) {
  return db(table)
    .where({ id: Number(id) })
    .delete();
}

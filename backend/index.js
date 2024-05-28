const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

const mongo_uri = 'mongodb+srv://finyagin02:japidaras@cluster0.d8qmgna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});

app.post('/api/update_level', async (req, res) => {
  const { username, level } = req.body;

  if (!username || !level) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();
    const db = client.db('test');
    const usersCollection = db.collection('users');
    await usersCollection.updateOne({ username: username }, { $set: { level: level } });
    await client.close();
    res.json({ message: "User level updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/update_selected_items', async (req, res) => {
  const { username, selectedItems } = req.body;
  if (!username || !selectedItems) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();
    const db = client.db('test');
    const usersCollection = db.collection('users');
    await usersCollection.updateOne({ username: username }, { $set: { selectedItems: selectedItems } });
    await client.close();
    res.json({ message: "Selected items updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/get_selected_items', async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();
    const db = client.db('test');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username: username });
    if (!user) {
      await client.close();
      return res.status(404).json({ error: "User not found" });
    }
    await client.close();
    res.json({ selectedItems: user.selectedItems || {} });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/create_user', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newUser = { username, email, password, friends: [], level: 1 }; // Додавання поля level зі значенням 1

  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();

    const db = client.db('test');
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ $or: [{ username: newUser.username }, { email: newUser.email }] });
    if (existingUser) {
      await client.close();
      return res.status(400).json({ error: "User with this username or email already exists" });
    }

    const result = await usersCollection.insertOne(newUser);
    await client.close();

    res.json({
      message: "User created successfully",
      user: { _id: result.insertedId, ...newUser }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();
    const db = client.db('test');
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}).toArray();
    await client.close();
    res.json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();
    const db = client.db('test');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    await client.close();
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    res.json({ message: "Login successful", user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/add_friend', async (req, res) => {
  const { loggedInUsername, friendUsername } = req.body;
  if (!loggedInUsername || !friendUsername) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();
    const db = client.db('test');
    const usersCollection = db.collection('users');
    await usersCollection.updateOne({ username: loggedInUsername }, { $addToSet: { friends: friendUsername } });
    await client.close();
    res.json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.delete('/api/remove_friend', async (req, res) => {
  const { username, friendUsername } = req.query;

  if (!username || !friendUsername) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();

    const db = client.db('test');
    const usersCollection = db.collection('users');

    await usersCollection.updateOne(
      { username: username },
      { $pull: { friends: friendUsername } }
    );

    await client.close();
    res.json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/api/user_friends', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();

    const db = client.db('test');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username: username });
    if (!user) {
      await client.close();
      return res.status(404).json({ error: "User not found" });
    }

    const friends = await usersCollection.find({ username: { $in: user.friends || [] } }).toArray();

    await client.close();
    res.json(friends);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/update_progress', async (req, res) => {
  const { username, progress } = req.body;

  if (!username || !progress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();

    const db = client.db('test');
    const usersCollection = db.collection('users');

    await usersCollection.updateOne(
      { username: username },
      { $set: { progress: progress } }
    );

    await client.close();
    res.json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/get_progress', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();

    const db = client.db('test');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username: username });
    if (!user) {
      await client.close();
      return res.status(404).json({ error: "User not found" });
    }

    await client.close();
    res.json({ progress: user.progress || 0 });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/get_level', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();

    const db = client.db('test');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username: username });
    if (!user) {
      await client.close();
      return res.status(404).json({ error: "User not found" });
    }

    await client.close();
    res.json({ level: user.level || 1 });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/update_level', async (req, res) => {
  const { username, level } = req.body;

  if (!username || !level) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = new MongoClient(mongo_uri);
    await client.connect();

    const db = client.db('test');
    const usersCollection = db.collection('users');

    await usersCollection.updateOne(
      { username: username },
      { $set: { level: level } }
    );

    await client.close();
    res.json({ message: "User level updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
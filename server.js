const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());

const fs = require('fs');

const USERS_FILE = "users.json";

// create file if not exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

/* ===============================
   🌍 PRELOADED DESTINATIONS
================================ */
let destinations = [
  {
    id: 1,
    name: "Goa",
    category: "beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    cost: 8000,
    desc: "Beautiful beaches and nightlife",
    rating: 5,
    map: "https://maps.google.com/maps?q=goa&output=embed"
  },
  {
    id: 2,
    name: "Manali",
    category: "mountain",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    cost: 10000,
    desc: "Snowy mountains and adventure",
    rating: 5,
    map: "https://maps.google.com/maps?q=manali&output=embed"
  },
  {
    id: 3,
    name: "Jaipur",
    category: "city",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    cost: 7000,
    desc: "Royal forts and culture",
    rating: 4,
    map: "https://maps.google.com/maps?q=jaipur&output=embed"
  },
  {
    id: 4,
    name: "Kerala",
    category: "beach",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    cost: 12000,
    desc: "Backwaters and greenery",
    rating: 5,
    map: "https://maps.google.com/maps?q=kerala&output=embed"
  },
  {
    id: 5,
    name: "Dubai",
    category: "city",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    cost: 50000,
    desc: "Luxury city and desert safari",
    rating: 5,
    map: "https://maps.google.com/maps?q=dubai&output=embed"
  },
  {
    id: 6,
    name: "Paris",
    category: "city",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    cost: 60000,
    desc: "Eiffel Tower and romantic vibes",
    rating: 5,
    map: "https://maps.google.com/maps?q=paris&output=embed"
  }
];

/* ===============================
   ✈️ TRIPS STORAGE
================================ */
let trips = [];

/* ===============================
   📡 ROUTES
================================ */

// GET USERS
app.get("/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET all destinations
app.get('/destinations', (req, res) => {
  res.json(destinations);
});

// ADD destination (admin)
app.post('/destinations', (req, res) => {
  const newDest = {
    id: Date.now(),
    ...req.body
  };
  destinations.push(newDest);
  res.json(newDest);
});

// DELETE destination
app.delete('/destinations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  destinations = destinations.filter(d => d.id !== id);
  res.json({ message: "Deleted successfully" });
});

// GET all trips
app.get('/trips', (req, res) => {
  res.json(trips);
});

// ADD trip
app.post('/trips', (req, res) => {
  const newTrip = {
    id: Date.now(),
    ...req.body
  };
  trips.push(newTrip);
  res.json(newTrip);
});

// REGISTER
app.post("/register", (req, res) => {
  const { username, password, role } = req.body;

  let users = readUsers();

  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    username,
    password,
    role
  };

  users.push(newUser);
  writeUsers(users);

  res.json({ success: true, message: "Registered successfully" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let users = readUsers();

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.json({ success: false });
  }

  res.json({
    success: true,
    username: user.username,
    role: user.role
  });
});

/* ===============================
   🚀 START SERVER
================================ */
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });



app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
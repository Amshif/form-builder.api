const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');

const app = express();


// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://form-hz07w9cil-amshifs-projects.vercel.app"], 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors())

// Middleware
app.use(bodyParser.json());

// Connect to Database
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running. Welcome to the API!');
});

// Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/forms', formRoutes);

// Start the Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
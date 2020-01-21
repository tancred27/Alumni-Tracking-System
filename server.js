const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect database:
connectDB();

// Use Middleware:
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send("Hello World!"));

const PORT = process.env.PORT || 5000;

// Define Routes:
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/college', require('./routes/colleges'));
app.use('/api/dir', require('./routes/dir'));

app.listen(PORT, () => console.log(`Server started on Port : ${PORT}`));



const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect database
connectDB();

//Init middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/students', require('./routes/api/students'));
app.use('/api/fees', require('./routes/api/fees'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server up and running...'));

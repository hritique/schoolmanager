const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const {
	auth,
	protectAPI,
	protectApp,
	isAlreadyAuthenticated,
} = require('./middleware/auth');

const app = express();

// Connect database
connectDB();

//Init middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(cookieParser());

// app.get('/', (req, res) => res.send('API Running'));

// Check if logged in
app.use(auth);

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/students', protectAPI, require('./routes/api/students'));
app.use('/api/fees', protectAPI, require('./routes/api/fees'));
app.use('/api/masters', protectAPI, require('./routes/api/masters'));

// Serve react app static assets

// Set static folder
app.use('/app', protectApp, express.static('client/build'));

app.get('/app/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use('/', isAlreadyAuthenticated, express.static('static'));

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, 'static', 'index.html'))
);

app.get('/login', (req, res) =>
	res.sendFile(path.join(__dirname, 'static', 'login.html'))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server up and running...'));

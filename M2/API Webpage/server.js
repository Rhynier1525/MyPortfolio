const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware to serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'assets'))); // Static files for CSS
app.use(express.static(path.join(__dirname, 'scripts'))); // Static files for JS

// SQLite Database Connection
const db = new sqlite3.Database('./bike_recommender.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Placeholder for recommendations route (update with actual logic)
app.post('/recommendations', (req, res) => {
    const { experienceLevel, budget, terrain } = req.body;

    // Example data, replace with actual database query
    const recommendations = [
        {
            bike_name: 'Mountain Master 3000',
            components: 'Shimano, SRAM, Fox'
        },
        {
            bike_name: 'Road Racer X1',
            components: 'Shimano, Campagnolo, Kenda'
        }
    ];

    res.json({ recommendations });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

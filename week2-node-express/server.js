const express = require('express');
const path = require('path'); //Built in module for handling file paths
const app = express();
const port = process.env.PORT || 3000; //Use PORT from .env or default to 3000

app.use(express.json()); //Built in Middleware for parsing JSON bodies

app.post('/data', (req, res) => {
    res.json({ received: req.body }); //Echo back the received JSON
});

// Serve static HTML page at /
app.use(express.static(path.join(__dirname, 'Public'))); //Serve index.html from BETECHIFIED_BACKEND folder

//  POST /user -> Accepts {name, email}; responds "Hello, [name]!"
app.use('/user', (req, res, next) => {
    if (req.method === 'POST') {
        const { name, email } = req.body;
        
        // Error handling: 400 for missing data
        if (!name || !email) {
            return res.status(400).json({ error: "Missing required fields: 'name' and 'email' are required." });
        }
        
        return res.status(201).send(`Hello, ${name}!`);
    }
next(); //Pass control to the next middleware or route handler  
});

//  GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});

app.get('/', (req, res) => {
  res.send('My Week 2 API!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
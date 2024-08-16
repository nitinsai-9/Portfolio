const express = require('express');
const responseSchema=require('./model/responses');
const mongoose=require('mongoose');
const app = express();
const PORT = 5500;
const mongoURI="mongodb://127.0.0.1:27017/responseForm";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Set view engine to EJS
app.set("view engine", "ejs");

// Middleware to parse incoming request bodies (not needed for GET requests, but good practice
app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

// Route to handle form submission and render response
app.get('/response', async(req, res) => {
    try {
        const { Name, Email, Subject, Message } = req.query;
        const newResponse = new responseSchema({
            name: Name,
            email: Email,
            subject: Subject,
            message: Message
        });
        const savedResponse = await newResponse.save();
        res.send("Thank you for submission");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

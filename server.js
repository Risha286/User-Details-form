const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

mongoose.connect('mongodb://0.0.0.0:27017/your_database_name', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Create a schema
// const User = mongoose.model('User', new mongoose.Schema({
//     firstName= {
//         type:string,
//     },
//     middleName: String,
//     lastName: String,
//     contactNumber: String,
//     email: String,
//     nationality: String
// }));

const Schema = mongoose.Schema;
const User = new Schema({
firstName :{
    type: String,
},

})

// Serve the HTML form
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
    console.log("values", req);
    try {
    const newUser = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        nationality: req.body.nationality
    });

    
        await newUser.save();
        res.status(200).send('User details saved successfully!');
    } catch (error) {
        res.status(500).send('Error saving user details.');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
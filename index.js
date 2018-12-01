'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// init database
mongoose.Promise = global.Promise;
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    highSchoolName: String,
    highSchoolCode: String,
    title: String,
    city: String,
    state: String,
    additionalContact1: String,
    addContactEmail1: String,
    addContactPhone1: String,
    additionalContact2: String,
    addContactEmail2: String,
    addContactPhone2: String
});
const RegForm = mongoose.model('RegForm', formSchema);
mongoose.connect('mongodb://John:jefferson1776@ds261917.mlab.com:61917/jm-scholar-uploads', { useNewUrlParser: true });

// init middleware
// const multer = require('multer');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// @route Default route, serves 'index.html'
app.get('/', (req, res) => {
    // res.send('JM Scholar Form Submission Server');
    res.sendFile(__dirname + '/public/views/index.html');
});

// @route POST '/submit-reg-form'
// @desc Intercepts POST requests from school registration form
app.post('/submit-reg-form', (req, res) => {
    console.log(`Received POST!`);
    // res.json(req.body);
    const data = new RegForm(req.body);
    data.save()
        .then(item => res.send('Item saved to database!'))
        .catch(err => res.status(400).send('Unable to save to database.'));
});

// init Express server
app.listen(port, () => {
    console.log(`Now listening on port: ${port}.`);
});

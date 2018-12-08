'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// init database
mongoose.Promise = global.Promise;

// High School Request Form Schema
const hsReqFormSchema = new mongoose.Schema({
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
const HSReqForm = mongoose.model('HSReqForm', hsReqFormSchema);

// Student Application Form Schema
const studentFormSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    birthYear: String,
    seniorStatus: String,
    usCitizen: String,
    schoolName: String,
    schoolCode: String,
    schoolAddress: String,
    schoolCity: String,
    schoolState: String,
    attendsParticipatingSchool: String
});
const StudentForm = mongoose.model('StudentForm', studentFormSchema);

// Volunteer to Judge Form Schema

// Connect to database
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

// @route POST '/submit-hs-req-form'
// @desc Intercepts POST requests from school registration form
app.post('/submit-hs-req-form', (req, res) => {
    console.log(`HS Request Form has been submitted!`);
    // res.json(req.body);
    const data = new HSReqForm(req.body);
    data.save()
        .then(item => res.send('Item saved to database!'))
        .catch(err => res.status(400).send('Unable to save to database.'));
});

// @route POST '/submit-student-app'
// @desc Intercepts POST requests from student application form
app.post('/submit-student-app', (req, res) => {
    console.log(`Student Application Form submitted!`);
    // res.json(req.body);
    const data = new StudentForm(req.body);
    data.save()
        .then(item => res.send('Item saved to database!'))
        .catch(err => res.status(400).send('Unable to save to database.'));
});

// init Express server
app.listen(port, () => {
    console.log(`Now listening on port: ${port}.`);
});

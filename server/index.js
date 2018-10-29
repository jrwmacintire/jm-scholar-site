const express = require('express');
const app = express();
const port = 3000;

// Serve static files, such as main index.html page.
app.use(express.static('../public'));

// app.get('/', (req, res) => {
//     res.send("This server receives post requests at '/register-student' and '/register-school'");
// });

app.post('/register-student', (req, res) => {
    res.send("Testing POST requests at '/register-student'.");
});

app.post('/register-school', (req, res) => {
    res.send("Testing POST requests at '/register-school'.");
});

app.listen(port, () => console.log(`Now listening on port: ${port}`));

const express = require('express');

// instantiation express app
const app = express();

// define server port
const port = 3200;

// create a default route
app.get('/', (req, res) => {
    res.send('express + typescript server');
});

// start listening to the request on the defined port
app.listen(port);

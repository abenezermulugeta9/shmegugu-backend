require('dotenv').config()
const express = require('express');
const cors = require('cors');
const conn = require('./database/connection')
const router = require('./routes/routes.js');
const projectRouter = require('./routes/projectRouter.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', router);
// app.use('*', (req, res, next) => {
//     res.status(404);
//     next(new Error(`Router not found.`)); 
// })

app.use((err, req, res, next) => {
    res.json({ err: err.message })
})

conn.connectDB(() => {
    app.listen(process.env.PORT, () => console.log("Server running...."))
})
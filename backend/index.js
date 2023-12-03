require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');

const users = require('./Routes/users')
const products = require('./Routes/products')
const cart = require('./Routes/cart')
const order = require('./Routes/orders')


// express app
const app = express()
// Enable CORS for all routes
app.use(cors())
// middleware
app.use(express.json());

// routes
app.use('/api/users', users)
app.use('/api/products', products)
app.use('/api/cart', cart)
app.use('/api/orders', order)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/Images'); // Specify the directory where the uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
    //res.json({ message: 'File uploaded successfully' });
    console.log('Backend: ', req.file)
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listening
    app.listen(process.env.PORT, () => {
        console.log('connected to mongodb and listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

module.exports = app;
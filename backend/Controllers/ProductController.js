const Product = require('../Models/ProductModel')
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');

// Get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(products)
}

// get single user
const getProductId = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Product Found'})
    }
    const product = await Product.findById(id)

    if(!product){
        return res.status(404).json({error: 'No Product Found'})
    }
    res.status(200).json(product)
}

// Create Product
const createProduct = async (req, res) => {
    const { invClass, category, subCategory, apparel, status, size, item_code, item_name, qty, unit_price } = req.body;

    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/Images'); // Specify the directory where the uploaded files will be stored
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = '_' + Date.now() + '-' + Math.round(Math.random() * 1E9);
                const fileName = file.fieldname + uniqueSuffix + path.extname(file.originalname);
                cb(null, fileName);
            },
        });

        const upload = multer({ storage: storage }).single('product_img');

        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const product = await Product.create({
                invClass,
                category,
                subCategory,
                apparel,
                status,
                size,
                item_code,
                item_name,
                qty,
                unit_price,
                product_img: req.file.filename,
            });

            res.status(200).json(product);
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));



// Retrieve uploaded files
app.get('https://proware-api.vercel.app/api/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'https://proware-api.vercel.app/api/', 'uploads', filename));
});

// Update Product
const updateProduct = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No product found'})
    }

    const product = await Product.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!product){
        return res.status(404).json({error: 'No product found'})
    }
    res.status(200).json(product)
}

// Delete Product
const deleteProduct = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No product found'})
    }

    const product = await Product.findOneAndDelete({_id: id})

    if(!product){
        return res.status(404).json({error: 'No product found'})
    }
    res.status(200).json(product)
}

module.exports = { getProducts, getProductId, deleteProduct, updateProduct, createProduct }
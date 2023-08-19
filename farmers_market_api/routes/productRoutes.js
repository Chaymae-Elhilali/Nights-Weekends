const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { ensureRole } = require('../middleware/roleMiddleware.js');  // Assuming you defined this earlier.

// @route   POST /products
// @desc    Add a new product
router.post('/', ensureRole(['farmer', 'admin']), async (req, res) => {
    const { name, description, price, quantity, imageUrl, category } = req.body;

    try {
        let product = new Product({
            farmer: req.user.id,
            name,
            description,
            price,
            quantity,
            imageUrl,
            category
        });

        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /products
// @desc    Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT /products/:id
// @desc    Update a product
router.put('/:id', ensureRole(['farmer', 'admin']), async (req, res) => {
    const { name, description, price, quantity, imageUrl, category } = req.body;

    const productFields = {};
    if (name) productFields.name = name;
    if (description) productFields.description = description;
    if (price) productFields.price = price;
    if (quantity) productFields.quantity = quantity;
    if (imageUrl) productFields.imageUrl = imageUrl;
    if (category) productFields.category = category;

    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        if (product.farmer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: productFields },
            { new: true }
        );

        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE /products/:id
// @desc    Delete a product
router.delete('/:id', ensureRole(['farmer', 'admin']), async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        if (product.farmer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Product.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Product removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /products/:id
// @desc    Get a single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server error');
    }
});




module.exports = router;

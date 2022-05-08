const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE PRODUCT
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE PRODUCT INFORMATION
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("This product has successfully been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET SINGLE PRODUCT BY THEIR ID
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS SAVED IN THE DATABASE
router.get("/", async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    try {
        let products;

        if (queryNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (queryCategory) {
            products = await Product.find({
                categories: {
                    $in: [queryCategory],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router
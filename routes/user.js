const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//UPDATE USER
router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PWD_SECRET_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE USER
router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Successfully Deleted!");
    } catch (err) {
        res.status(500).json(err);
    };
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;

        res.status(200).json({ others });
    } catch (err) {
        res.status(500).json(err);
    };
});

//GET ALL USER'S
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();

        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json(err);
    };
});


module.exports = router
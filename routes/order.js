const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorisation} = require("./verifyToken");

const router = require("express").Router();

//CREATE ORDER
router.post("/", async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE ORDER INFORMATION
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE ORDER
router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("This Order has successfully been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ORDER(S)
//router.get("/find/:id", verifyTokenAndAuthorisation, async (req, res) => {
    //try {
        //const orders = await Order.findById(req.params.id);
        //res.status(200).json(orders);
    //} catch (err) {
        //res.status(500).json(err);
    //}
//});
//GET USER ORDERS
router.get("/:userId", async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL ORDERS SAVED IN THE DATABASE
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router
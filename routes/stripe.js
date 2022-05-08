const router = require("express").Router();
//const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const stripe = require("stripe")("sk_test_51KjmIgJXQVt3j3p0V3bW8Ey71gajE3TQhQ3IGS8QwQaWFrJS151D3liO5YyQu4UTY50MuwmIddhzTGvbStgETql800wcBW2Ygs");


router.post("/payment", (req, res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "gbp",
    }, (stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    });
});

module.exports = router;
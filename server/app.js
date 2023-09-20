// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51NoPsnSGyWHGuIX0O1txX0sZCxhf3zxza0CJFRrGIkUAECmpenBd8OGmXuRiPQGkjeTm4Jpc69wgfTK3AMsEMwc900YZyDPlL9"
);
const express = require("express");
const app = express();
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "inr",
          product_data: {
            name: req.body.title,
          },

          unit_amount: req.body.price*100*82
        },
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ session });
});

app.listen(5000, () => console.log("Running on port 5000"));

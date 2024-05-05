const express = require("express");
const PayOS = require("@payos/node");

const payos = new PayOS(
  "04137e5d-0642-41c3-b3ab-3dc618697a79",
  "d7aa9d5c-1a22-4609-906b-7039f2c2e627",
  "d71efc00c44d08f37609502ea2fcdf31d63af22ce1512f3517897a56f1093849"
);
const app = express();
app.use(express.static("public"));
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:3000";
app.post("/create-payment-link", async (req, res) => {
  const order = {
    amount: 10000,
    description: "Thanh toan mi tom",
    orderCode: 111,
    returnUrl: `${YOUR_DOMAIN}/success.html`,
    cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
  };
  const paymentLink = await payos.createPaymentLink(order);
  res.redirect(303, paymentLink.checkoutUrl);
});
app.listen(3000, () => console.log("running on port 3000"));

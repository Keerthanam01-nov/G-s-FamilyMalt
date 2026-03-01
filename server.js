const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/order", async (req, res) => {
  try {
    const { name, email, phone, quantity, address } = req.body;

    // Validation
    if (!name || !email || !phone || !quantity || !address) {
      return res.status(400).send("All fields are required");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "keerthanam8073@gmail.com",      // your gmail
        pass: "lozdxppvekpgklom"    // Gmail App Password (NOT normal password)
      }
    });

    const mailOptions = {
      from: "yourgmail@gmail.com",
      to: `${email}, keerthanam8073@gmail.com`,  // customer + owner
      subject: "New Order - G's Family Malt",
      html: `
        <h2>Order Details</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <p><b>Address:</b> ${address}</p>
        <br>
        <p>Thank you for choosing G's Family Malt ❤️</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.send(`
      <h2>Order placed successfully!</h2>
      <p>Email sent to customer and owner.</p>
      <a href="/">Go Back</a>
    `);

  } catch (error) {
    console.error(error);
    res.status(500).send("Mail sending failed. Check App Password.");
  }
});

app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});
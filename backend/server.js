require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000", // Update to the correct origin of your frontend
  methods: "POST",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/api", async (req, res) => {
  const { name, contactNumber, callbackTime, additionalComments } = req.body;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: "New Callback Request",
    html: `
      <p>Name: ${name}</p>
      <p>Contact Number: ${contactNumber}</p>
      <p>Preferred Callback Time: ${callbackTime}</p>
      <p>Additional Comments: ${additionalComments}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

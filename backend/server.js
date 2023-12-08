const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/", (req, res) => {
  const { name, contactNumber, callbackTime, additionalComments } = req.body;

  const msg = {
    to: "nishant.work11@gmail.com",
    from: "nishant.work11@gmail.com",
    subject: "New Callback Request",
    text: `
      Name: ${name || "Not provided"}
      Contact Number: ${contactNumber}
      Preferred Callback Time: ${callbackTime || "Not specified"}
      Additional Comments or Questions: ${additionalComments || "None"}
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("Callback request submitted successfully");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

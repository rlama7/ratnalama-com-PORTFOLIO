/**
 * server.js      - A personal portfolio website built on modern flat, responsive and mobile first design.
 * @author          Ratna Lama
 * @date            6/19/2019
 *
 * @description     Modern flat, responsive and mobile first design achieved using NodeJS express in the
 *                  backend and HTML, CSS, Bootstrap in the frontend.
 *                  Deployed to the AWS cloud using Linux EC2 instance.
 *                  Version controlled using git and GitHub.
 */
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

/**
 * View Engine Setup
 */
app.set("view engine", "ejs"); // set view engine

/**
 * Body Parser Middleware
 */
app.use(bodyParser.urlencoded({ extended: false })); // body-parser
app.use(bodyParser.json());

/**
 * Static folder
 */
app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.render("index"));

app.get("/contact", (req, res) => res.render("contact"));

app.get("/thankyou", (req, res) => res.render("thankyou"));

app.get("/privacy-policy", (req, res) => res.render("privacy-policy"));

app.get("/rlama.pdf", (req, res) => res.render("rlama.pdf"));

app.get("/error", (req, res) => res.render("error"));

app.post("/contact", (req, res) => {
  //   console.log(req.body);
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
      <li>${req.body.name}</li>
      <li>${req.body.company}</li>
      <li>${req.body.email}</li>
      <li>${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "*************@gmail.com", // generated ethereal user
      pass: "*************" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send email data with unicode symbols
  let mailOptions = {
    from: '"ratnalama.com" <*************@gmail.com>', // sender address
    to: "*************@gmail.com", // list of receivers
    subject: "CONTACT US", // Subject line
    text: "Hello there?", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.redirect("/thankyou");
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

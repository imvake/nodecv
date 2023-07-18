const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/assets", express.static(path.join(__dirname, "views", "assets")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

console.log(process.env.AUTH_PASS);
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "altarteelbot@gmail.com",
      pass: "uphewvzfmgucqqbr",
    },
  });

  // Configure the email options
  const mailOptions = {
    from: `${name}`,
    to: "al8hm92@gmail.com",
    subject: "New Contact Form Submission",
    text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.render("index.ejs", { success: false });
      alert("Error");
    } else {
      console.log("Email sent:", info.response);
      res.render("index.ejs", { success: true });
      alert("Email Sent");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

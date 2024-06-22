// build server
const express = require("express");
const app = express();
const multer = require("multer");
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const path = require("path");

const { loadContact, detailContact, addContact } = require("./utils/contacts");
// ACCESS TO ASSETS FOR PUBLIC
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/"); // Lokasi penyimpanan file di server
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Menyimpan dengan nama asli
  },
});
const upload = multer({ storage: storage });

// USE EJS
app.set("views", "./views");
app.set("view engine", "ejs");

// third party middleware
app.use(expressLayouts);

// built in middleware
app.use(express.urlencoded({ extended: true }));

// APPLICATION LEVEL MIDDLEWARE
app.get("/", (req, res) => {
  const contacts = loadContact();
  res.render("index", {
    title: "Home Page",
    contacts,
    layout: "layouts/mainlayouts.ejs",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    layout: "layouts/mainlayouts.ejs",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    title: "Contact Page",
    contacts,
    layout: "layouts/mainlayouts.ejs",
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add-contacts", {
    title: "Add Contact Page",
    layout: "layouts/mainlayouts.ejs",
  });
});

app.post("/contact", upload.single("img"), (req, res) => {
  const imagePath = req.file ? req.file.filename : "Default.jpg";
  const contact = { ...req.body, img: "img/" + imagePath };
  console.log(contact);
  addContact(contact);
  res.redirect("/contact");
});

app.get("/contact/:name", (req, res) => {
  const name = req.params.name;
  const detail = detailContact(name);
  // if (!detail) {
  //   res.send(404, `${name} Not Found`);
  // }
  res.render("detail", {
    title: "Detail Page",
    detail,
    layout: "layouts/mainlayouts.ejs",
  });
});

// for request anything
app.use("/", (req, res) => {
  res.send(404, "Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

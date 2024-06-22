// build server
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = 8000;

const { loadContact, detailContact } = require("./utils/contacts");

// USE EJS
app.set("views", "./views");
app.set("view engine", "ejs");

// third party middleware
app.use(expressLayouts);

// ACCESS TO ASSETS FOR PUBLIC
// built in middleware
app.use(express.static("public"));

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

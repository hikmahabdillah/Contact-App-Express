// build server
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = 8000;

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
  const data = [
    {
      name: "Aldrin",
      age: 19,
      email: "hikmahald@gmail.com",
    },
    {
      name: "Gracia",
      age: 23,
      email: "graciaald@gmail.com",
    },
    {
      name: "Hillary",
      age: 17,
      email: "hillaryald@gmail.com",
    },
  ];
  res.render("index", {
    title: "Home Page",
    data,
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
  res.render("contact", {
    title: "Contact Page",
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

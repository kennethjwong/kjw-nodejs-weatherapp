const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(__filename);

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicPath = path.join(__dirname, "../public");
// console.log(publicPath);
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebar
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jon Doe",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Jon Doe",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "Help text",
    name: "Jon Doe",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must include an address!!!",
    });
  }
  // res.send({
  //   forecast: "Thunderstorm",
  //   location: req.query.address,
  //   address: req.query.address,
  // });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, weatherData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: weatherData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
    return;
  }

  console.log(req.query);
  console.log(req.query.search);
  console.log(req.query.rating);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    name: "Jon Doe",
    errorMsg: "Help article not found ... ",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    errorMsg: "Page not found",
    name: "Jon Doe",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

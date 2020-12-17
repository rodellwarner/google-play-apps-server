const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const apps = require("./playstore.js");

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;

  // let results = apps.filter((theAppBeingConsidered) =>
  //   theAppBeingConsidered.App.toLowerCase()
  // );

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  const sortedApps = apps.sort((a, b) =>
    a.App > b.App ? 1 : b.App > a.App ? -1 : 0
  );

  if (sort) {
    if (["app"].includes(sort)) {
      res.json(sortedApps);
    }
  }

  // if (sort) {
  //   if (["rating"].includes(sort)) {}
  // }

  res.json(apps);
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

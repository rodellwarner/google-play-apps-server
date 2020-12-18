const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const apps = require("./playstore.js");

app.get("/apps", (req, res) => {
  const sort = req.query.sort;
  const genres = req.query.genres;
  // const { sort, genres } = req.query;

  if (req.query) {
    if (genres && sort) {
      // write code to filter by genre and create a variable that is an array of the filteres results, then sort that array by the sort parameter.

      if (
        !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
          genres
        )
      ) {
        return res
          .status(400)
          .send(
            "Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card"
          );
      }

      if (!["rating", "app"].includes(sort)) {
        return res.status(400).send("Sort must be one of rating or app");
      }

      const filteredForSelectedGenre = apps.filter((anApp) => {
        return anApp.Genres === genres;
      });

      if (sort === "app") {
        const filteredForSelectedGenreSortedByApp = filteredForSelectedGenre.sort(
          (a, b) =>
            a.App.toLowerCase() > b.App.toLowerCase()
              ? 1
              : b.App.toLowerCase() > a.App.toLowerCase()
              ? -1
              : 0
        );
        res.json(filteredForSelectedGenreSortedByApp);
      }

      if (sort === "rating") {
        const filteredForSelectedGenreSortedByGenre = filteredForSelectedGenre.sort(
          (a, b) => (b.Rating > a.Rating ? 1 : a.Rating > b.Rating ? -1 : 0)
        );
        res.json(filteredForSelectedGenreSortedByGenre);
      }

      // res.json(filteredForSelectedGenre);
    }

    if (genres) {
      if (
        !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
          genres
        )
      ) {
        return res
          .status(400)
          .send(
            "Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card"
          );
      }

      if (
        ["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
          genres
        )
      ) {
        const selectedGenres = apps.filter((particularApp) => {
          return particularApp.Genres === genres;
        });
        res.json(selectedGenres);
      }
    }

    if (sort) {
      // I understand the line below now. It was confusing to me before. It reads like this:  "If it is not true that
      // the array ["rating", "app"] includes the variable named sort, which is defined as whatever is entered at req.query.sort, then return..."
      if (!["rating", "app"].includes(sort)) {
        return res.status(400).send("Sort must be one of rating or app");
      }

      if (sort === "app") {
        const sortedApps = apps.sort((a, b) =>
          a.App.toLowerCase() > b.App.toLowerCase()
            ? 1
            : b.App.toLowerCase() > a.App.toLowerCase()
            ? -1
            : 0
        );
        res.json(sortedApps);
      }

      if (sort === "rating") {
        const sortedRatings = apps.sort((a, b) =>
          b.Rating > a.Rating ? 1 : a.Rating > b.Rating ? -1 : 0
        );
        res.json(sortedRatings);
      }
    }
  }

  res.json(apps);
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

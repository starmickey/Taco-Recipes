import express from "express";
import bodyParser from "body-parser";
import { readFile } from 'fs/promises';

const app = express();
const port = 3000;

// Import recipes from json file
const recipes = JSON.parse(
  await readFile(
    new URL('./recipe.json', import.meta.url)
  )
);

// App config
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// App api
let recipe;

app.get("/", (req, res) => {
  res.render("index.ejs", { recipe });
});

app.post("/recipe", (req, res) => {
  const choiceId = req.body.choice;
  recipe = recipes.find((r) => r.id === choiceId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

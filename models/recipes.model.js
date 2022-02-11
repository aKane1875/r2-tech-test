const fs = require("fs/promises");

exports.selectRecipes = (exclude_ingredients) => {
  return fs
    .readFile(`${__dirname}/../data/data.json`, "utf8")
    .then((stringifiedRecipes) => {
      const recipes = JSON.parse(stringifiedRecipes);

      return recipes;
    });
};

const fs = require("fs/promises");

exports.selectRecipes = (exclude_ingredients) => {
  return fs
    .readFile(`${__dirname}/../data/data.json`, "utf8")
    .then((stringifiedRecipes) => {
      const recipes = JSON.parse(stringifiedRecipes);
      if (exclude_ingredients) {
        const filteredRecipes = recipes.filter((recipe) => {
          for (let i = 0; i < recipe.ingredients.length; i++) {
            if (recipe.ingredients[i].name === exclude_ingredients) {
              return false;
            }
          }
          return true;
        });
        return filteredRecipes;
      }

      return recipes;
    });
};

const fs = require("fs/promises");

exports.selectRecipes = (exclude_ingredients) => {
  return fs
    .readFile(`${__dirname}/../data/data.json`, "utf8")
    .then((stringifiedRecipes) => {
      const recipes = JSON.parse(stringifiedRecipes);

      if (exclude_ingredients) {
        const ingredientsArray = exclude_ingredients.split(",");

        const filteredRecipes = recipes.filter((recipe) => {
          const namesToCheck = recipe.ingredients.map(
            (ingredient) => ingredient.name
          );

          for (let j = 0; j < ingredientsArray.length; j++) {
            if (namesToCheck.includes(ingredientsArray[j])) {
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

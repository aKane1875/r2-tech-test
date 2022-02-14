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

exports.selectRecipeById = (id) => {
  return fs
    .readFile(`${__dirname}/../data/data.json`, "utf8")
    .then((stringifiedRecipes) => {
      const recipes = JSON.parse(stringifiedRecipes);
      for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id === id) {
          return recipes[i];
        }
      }
    });
};

exports.addNewRecipe = (imageUrl, instructions, ingredients) => {
  return fs
    .readFile(`${__dirname}/../data/data.json`, "utf8")
    .then((stringifiedRecipes) => {
      const recipes = JSON.parse(stringifiedRecipes);
      const highestId = recipes.map((recipe) => {
        return Number(recipe.id.slice(7));
      });
      const idNumber = Math.max(...highestId) + 1;
      const id = "recipe-" + idNumber.toString();
      const newRecipe = {
        id,
        imageUrl,
        instructions,
        ingredients,
      };
      recipes.push(newRecipe);
      // console.log(Array.isArray(recipes));
      fs.writeFile(
        `${__dirname}/../data/data.json`,
        JSON.stringify(recipes),
        "utf8"
      );

      return recipes.pop();
    });
};

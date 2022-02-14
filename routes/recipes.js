const recipesRouter = require("express").Router();
const {
  getRecipes,
  getRecipeById,
  postNewRecipe,
} = require("../controllers/recipes.controller");

recipesRouter.route("/").get(getRecipes).post(postNewRecipe);
recipesRouter.route("/:id").get(getRecipeById);

module.exports = recipesRouter;

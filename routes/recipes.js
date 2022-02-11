const recipesRouter = require("express").Router();
const { getRecipes } = require("../controllers/recipes.controller");

recipesRouter.route("/").get(getRecipes);

module.exports = recipesRouter;

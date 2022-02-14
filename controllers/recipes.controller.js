const { selectRecipes, selectRecipeById } = require("../models/recipes.model");

exports.getRecipes = (req, res, next) => {
  const { exclude_ingredients } = req.query;
  selectRecipes(exclude_ingredients)
    .then((recipes) => {
      res.status(200).send({ recipes });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRecipeById = (req, res, next) => {
  const { id } = req.params;

  if (!id.match(/recipe-\d+/)) {
    res.status(400).send({
      msg: "Invalid request, recipe-id needed(eg. recipe-59)",
    });
  }

  selectRecipeById(id)
    .then((recipe) => {
      if (recipe === undefined) {
        res.status(404).send({ msg: "No recipe with this ID found" });
      }
      res.status(200).send({ recipe });
    })
    .catch((err) => {
      // console.log(err);
    });
};

const { selectRecipes } = require("../models/recipes.model");

exports.getRecipes = (req, res, next) => {
  selectRecipes()
    .then((recipes) => {
      res.status(200).send({ recipes });
    })
    .catch((err) => {
      console.log(err);
    });
};

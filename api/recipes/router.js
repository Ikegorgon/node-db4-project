const router = require('express').Router();
const Recipe = require('./module.js');

router.get('/:recipe_id', (req, res, next) => {
    Recipe.getRecipeById(req.params.recipe_id)
        .then(resource => {
            res.status(200).json(resource);
        })
        .catch(next)
})
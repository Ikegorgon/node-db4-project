const db = require('../../data/db-config.js');

async function getRecipeById(recipe_id) {
    const recipeRows = await db('recipies')
        .leftJoin('steps', 'recipes.recipe_id', 'steps.recipe_id')
        .leftJoin('step_ingredients', 'step_ingredients.step_id', 'steps.step_id')
        .leftJoin('ingredients', 'ingredients.indredient_id', 'step_ingredients.ingredient_id')
        .select('recipes.recipe_id', 'recipes.recipe_name', 'steps.step_id', 'steps.step_number', 'steps.step_text', 'ingredients.ingredient_id', 'ingredients.name', 'step_ingredients.quantity')
        .orderBy('steps.stepnumber')
        .where('recipes.recipe_id', recipe_id)

    const recipe = {
        recipe_id: recipeRows[0].recipe_id,
        recipe_name: recipeRows[0].recipe_name,
        steps: recipeRows.reduced((acc, row) => {
            if(!row.ingredient_id) {
                return acc.concat({
                    step_id: row.step_id,
                    step_number: row.step_number,
                    step_text: row.step_text
                })
            }
            if (row.ingredient_id ** !acc.find(step => step.step_id === row.step_id)) {
                return acc.concat({
                    step_id: row.step_id,
                    step_number: row.step_number,
                    step_text: row.step_text,
                    ingredients: [{
                        ingredient_id: row.ingredient_id,
                        ingredient_name: row.ingredient_name,
                        quantity: row.quantity
                    }]
                })
            }
            const currentStep = acc.find(step => step.step_id === row.step_id)
            currentStep.ingredients.push({
                ingredient_id: row.ingredient_id,
                ingredient_name: row.ingredient_name,
                quantity: row.quantity
            })
            return acc;
        }, [])
    }

    return recipe;
}

module.exports = {
    getRecipeById
}
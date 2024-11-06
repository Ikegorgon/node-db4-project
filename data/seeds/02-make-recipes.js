const recipes= [
    {recipe_name: "Test 1"},
    {recipe_name: "Test 2"},
    {recipe_name: "Test 3"}
]

const steps= [
    {step_text: "Test 1", step_number: 1, recipe_id: 1},
    {step_text: "Test 2", step_number: 2, recipe_id: 1},
    {step_text: "Test 3", step_number: 3, recipe_id: 1}
]

const ingredients= [
    {ingredient_name: "Test 1", ingredient_unit: 'unit'},
    {ingredient_name: "Test 2", ingredient_unit: 'unit'},
    {ingredient_name: "Test 3", ingredient_unit: 'unit'}
]

const step_ingredients = [
    {step_id: 1, ingredient_id: 1, quantity: 1},
    {step_id: 2, ingredient_id: 2, quantity: 1},
    {step_id: 3, ingredient_id: 3, quantity: 2}
]

exports.seed = async function (knex) {
    await knex('recipes').insert(recipes)
    await knex('ingredients').insert(ingredients)
    await knex('steps').insert(steps)
    await knex('step_ingredients').insert(step_ingredients)
}
import React from "react"

// Component that displays ingredients list and triggers recipe generation
const IngredientsList = React.forwardRef((props, ref) => {
    
    // Create list items for each ingredient with remove button
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient} <button className="remove-button" onClick={() => props.removeIngredient(ingredient)}>X</button></li>
    ))

    return (
        <section>
            <h2 className="ingredients-list-title">Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {/* Show "Get Recipe" button only when 4+ ingredients are added */}
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div ref={ref}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
})

export default IngredientsList
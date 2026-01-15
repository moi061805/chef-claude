import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromChefClaude } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("") 
    const recipeSection = React.useRef(null)
    const [loading , setLoading] = React.useState(false)

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])
    
    async function getRecipe() {
        setLoading (true)
        try{    
            const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
            setRecipe(recipeMarkdown)
        } catch (error) {
            setRecipe("Sorry, there was an error generating your recipe. Please try again.")
        } finally {
            setLoading (false)
        }
    }

    function addIngredient(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
            e.target.reset()
        }
    }

    function removeIngredient(ingredientToRemove) {
        setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient !== ingredientToRemove))
    }

    return (
        <main>
            
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length < 4 && <h1 className="chef-claude-prompt">Please provide at least 4 ingredients so that Claude AI can generate a recipe.</h1>}


            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    removeIngredient={removeIngredient}
                    ref={recipeSection}
                />
            }
            {loading && <p className="loader">Generating Recipe...</p>}
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
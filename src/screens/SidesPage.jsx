import DataContext from "../contexts/DataContext";
import RecipeCard from "../components/RecipeCard";
import { useContext, useEffect, useState } from "react";

const SidesPage = (props) => {

    const [recipes, setRecipes] = useContext(DataContext);
    const [shown, setShown] = useState([]);

    useEffect(() => {
        setShown(recipes.filter((recipe)=> recipe.recipeType === 'Side'))
    },[recipes])

    return <div>
        {
        shown.length > 0 ?
            shown.map((recipe) => {
                //console.log(recipe)
                return <RecipeCard key={recipe.recipeID} recipeName={recipe.name} ingredients={recipe.ingredients} directions={recipe.directions}/>
            })
        : <h2>No Recipes In This Category</h2>
        }

    </div>
}

export default SidesPage;
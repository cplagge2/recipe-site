import DataContext from "../contexts/DataContext";
import RecipeCard from "../components/RecipeCard";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const RecipePage = (props) => {

    const [recipes, setRecipes] = useContext(DataContext);
    const [valid, setValid] = useState([]);
    const [shown, setShown] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        setSearch("")
        setValid(recipes.filter((recipe)=> recipe.recipeType === props.type))
    },[recipes, props])

    useEffect(()=> {
        setShown(valid.filter((recipe) => recipe.recipeName.toLowerCase().includes(search.toLowerCase())))
    }, [search,valid])

    return <>
        <Form.Label htmlFor="search-bar" id="search-bar-header">Search</Form.Label>
        <Form.Control id="search-bar" value={search} onChange={(e) => setSearch(e.target.value)}></Form.Control>
        <br/>
        {
        shown.length > 0 ?
            shown.map((recipe) => {
                return <RecipeCard key={recipe.recipeID} recipeID={recipe.recipeID} recipeName={recipe.recipeName} ingredients={recipe.ingredients} directions={recipe.directions}/>
            })
        : <h2>No Recipes In This Category</h2>
        }

    </>
}

export default RecipePage;
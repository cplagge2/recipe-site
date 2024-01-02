import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import DataContext from "../contexts/DataContext";

const RecipeCard = (props) => {

    const [recipes, setRecipes] = useContext(DataContext);

    const updateFavorite = ()=>{
        fetch(`https://324t9imtmd.execute-api.us-east-2.amazonaws.com/default/recipes/${props.recipeID}`, {
            method: "DELETE"
        }).then(resp => {
            if(resp.status === 200){
                setRecipes(recipes.filter((r) => r.recipeID !== props.recipeID))
            }
            else{
                alert("Could not delete");
            }
        })
    }


    return <Card>
        {
            <>
            <h1>{props.recipeName}</h1>
            <h3>Ingredients</h3>
            <ul>
            {
                props.ingredients.split(";").map((ingredient, index) => <li key={index}>{ingredient.trim()}</li>)
            }
            </ul>
            <h3>Directions</h3>
            <ol>
            {
                props.directions.split(";").map((ingredient, index) => <li key={index}>{ingredient.trim()}</li>)
            }
            </ol>
            <Button onClick = {updateFavorite} style={{backgroundColor:"blue"}}>Delete Recipe</Button>
            </>
        }
    </Card>
}

export default RecipeCard;
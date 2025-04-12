import { Card, Button, Row, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import DataContext from "../contexts/DataContext";

const RecipeCard = (props) => {

    const [recipes, setRecipes] = useContext(DataContext);

    const [deleteable, setDeletable] = useState(false);

    const deleteRecipe = ()=>{
        if (!deleteable) {
            setDeletable(true);
        }
        else {
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
    }


    return <Card id="recipe-card">
        {
            <div id="card-content">
                <Row>
                    <Col>
                        <h1>{props.recipeName}</h1>
                    </Col>
                    <Col xs sm md lg xl = {2} style={{display:'flex', justifyContent:'right'}}>
                        <Button onClick = {deleteRecipe} style={{backgroundColor:"red", borderColor:"black"}}>{deleteable ? 'Are you sure?' : 'Delete Recipe'}</Button>
                    </Col>
                </Row>
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
            </div>
        }
    </Card>
}

export default RecipeCard;
import { Card } from "react-bootstrap";

const RecipeCard = (props) => {

    return <Card id="recipe-card">
        {
            <div id="card-content">
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
            </div>
        }
    </Card>
}

export default RecipeCard;
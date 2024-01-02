import {Form, Button} from "react-bootstrap";
import { useState, useContext } from "react";
import DataContext from "../contexts/DataContext";


export default function AddRecipe(props) {

    const [name, setName] = useState("");
    const [type, setType] = useState("Appetizer");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [recipes, setRecipes] = useContext(DataContext);


    const sendRecipe = () => {
        let idVal = new Date().getTime();
            console.log(idVal);
            fetch(`https://324t9imtmd.execute-api.us-east-2.amazonaws.com/default/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': idVal.toString(),
                    'type': type,
                    'name': name,
                    'ingredients': ingredients,
                    'directions': steps
                })})
            .then((resp) => {
                if(resp.status === 200){
                    return resp.json()
                }
                else{
                    alert("Failed to add recipe")
                }
            })
            .then(() => {
                    setRecipes((old) => 
                         [...old, {
                        'recipeID': idVal.toString(),
                        'recipeType': type,
                        'recipeName': name,
                        'ingredients': ingredients,
                        'directions': steps
                    }])
                    setName("");
                    setIngredients("");
                    setSteps("");
                }
            );
    } 

    

    return <>
        <h1>Add New Recipe</h1>
        <h3>To add lists (i.e ingredients or steps) enter as semicolon separated list as below</h3>
        <h6>1/4 teaspoon salt; 1/3 cup butter; 2 eggs</h6>
        <Form>
            <Form.Label htmlFor="recipeType">Type</Form.Label>
            <Form.Select id="recipeType" onChange={(e) => setType(e.target.value)}>
                <option>Appetizer</option>
                <option>Side Dish</option>
                <option>Entree</option>
                <option>Sweet</option>
            </Form.Select>
            <Form.Label htmlFor="recipeName">Name</Form.Label>
            <Form.Control id="recipeName" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
            <Form.Control id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)}></Form.Control>
            <Form.Label htmlFor="steps">Directions</Form.Label>
            <Form.Control id="steps" value={steps} onChange={(e) => setSteps(e.target.value)}></Form.Control>
        </Form>
        <br />
        <Button onClick={sendRecipe}>Add to Cookbook</Button>
    </>
}
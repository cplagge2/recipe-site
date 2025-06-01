import {Form, Button} from "react-bootstrap";
import { useState, useContext, useEffect, useRef } from "react";
import DataContext from "../contexts/DataContext";
import Select from "react-select";


export default function UpdateRecipe(props) {

    const [name, setName] = useState("");
    const nameRef = useRef("");
    const [type, setType] = useState("Appetizer");
    const typeRef = useRef("");
    const [ingredients, setIngredients] = useState("");
    const ingredientsRef = useRef("");
    const [steps, setSteps] = useState("");
    const directionsRef = useRef("");
    const [recipes, setRecipes] = useContext(DataContext);
    const [options, setOptions] = useState("");
    const [active, setActive] = useState({});


    useEffect(() => {
        let optionArray = recipes.reduce((prev, cur) => [...prev, {value: cur.recipeName.toLowerCase(), label: cur.recipeName}], [])
        setOptions(optionArray)
    }, [recipes])

    const recipePicked = (newVal) => {
        let activeRecipe = recipes.find(recipe => recipe.recipeName.toLowerCase() === newVal.toLowerCase());
        setName(activeRecipe.recipeName);
        setIngredients(activeRecipe.ingredients);
        setSteps(activeRecipe.directions);
        setType(activeRecipe.recipeType);
        setActive(activeRecipe)
        nameRef.current.value = activeRecipe.recipeName;
        ingredientsRef.current.value = activeRecipe.ingredients;
        directionsRef.current.value = activeRecipe.directions;
        typeRef.current.value = activeRecipe.recipeType;
    }


    const sendRecipe = () => {
        let idVal = active.recipeID;
        if(idVal){
            fetch(`https://324t9imtmd.execute-api.us-east-2.amazonaws.com/default/recipes/${idVal}`, {
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
                    let updated = recipes.filter(r => r.recipeID !== idVal);
                    updated.push({
                        'recipeID': idVal,
                        'recipeType': type,
                        'recipeName': name,
                        'ingredients': ingredients,
                        'directions': steps
                    });
                    setRecipes(updated);
                    setName("");
                    setIngredients("");
                    setSteps("");
                    nameRef.current.value = "";
                    ingredientsRef.current.value = "";
                    directionsRef.current.value = "";
                }
            );
        }
    } 

    

    return <>
        <h1>Update Recipe</h1>
        <Select options={options}
        onChange={(e) => recipePicked(e.value)}
        defaultValue={""} />
        <br/>
        <Form>
            <Form.Label htmlFor="recipeType">Type</Form.Label>
            <Form.Select id="recipeType" ref={typeRef} onChange={(e) => setType(e.target.value)}>
                <option>Appetizer</option>
                <option>Side Dish</option>
                <option>Entree</option>
                <option>Sweet</option>
                <option>Drink</option>
            </Form.Select>
            <Form.Label htmlFor="recipeName">Name</Form.Label>
            <Form.Control id="recipeName" ref={nameRef} onChange={(e) => setName(e.target.value)}></Form.Control>
            <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
            <Form.Control id="ingredients" ref={ingredientsRef} onChange={(e) => setIngredients(e.target.value)}></Form.Control>
            <Form.Label htmlFor="steps">Directions</Form.Label>
            <Form.Control id="steps" ref={directionsRef} onChange={(e) => setSteps(e.target.value)}></Form.Control>
        </Form>
        <br />
        <Button onClick={sendRecipe}>Update Cookbook</Button>
    </>
}
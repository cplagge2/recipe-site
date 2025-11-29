import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import DataContext from "../contexts/DataContext";
import { Button } from "react-bootstrap";

export default function DeleteRecipe(props) {

    const [recipes, setRecipes] = useContext(DataContext);
    const [options, setOptions] = useState([]);
    const [recipe, selectRecipe] = useState("");
    const [recipeName, setRecipeName] = useState("");

    useEffect(() => {
        let optionArray = recipes.reduce((prev, cur) => [...prev, {value: cur, label: cur.recipeName}], [])
        setOptions(optionArray)
    }, [recipes])

    const deleteRecipe = ()=>{
        fetch(`https://324t9imtmd.execute-api.us-east-2.amazonaws.com/default/recipes/${recipe.recipeID}`, {
            method: "DELETE"
        }).then(resp => {
            if(resp.status === 200){
                setRecipes(recipes.filter((r) => r.recipeID !== recipe.recipeID))
                alert("Recipe deleted")
                selectRecipe(old => "");
            }
            else{
                alert("Could not delete");
            }
        })
    }

    const showDeletion = () => {
        return <div>
            <h4>Warning! This will permanently delete the recipe</h4>
            <Button variant="danger" onClick={deleteRecipe}>Delete Recipe</Button>
        </div>
    }

    useEffect(() => {
        const selectedRecipe = options.filter(o => o.value === recipe);
        const selectedRecipeName = selectedRecipe && selectedRecipe.length > 0 ? selectedRecipe[0] : "";
        setRecipeName(old => selectedRecipeName);
    }, [options, recipe])

    return <>
        <h1>Delete Recipe</h1>
        <Select 
            options={options} 
            onChange={(e) => selectRecipe(old => e.value)} 
            value={recipeName}
        />
        <br/>
        {
            recipe ? showDeletion() : <></>
        }
    </>

}
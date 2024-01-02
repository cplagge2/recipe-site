import { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import DataContext from "../contexts/DataContext";

const RecipeSite = (props) => {

    const [recipeList, setRecipes] = useState([]);
    const initialized = useRef(false);


    const loadData = () => {
        fetch('https://324t9imtmd.execute-api.us-east-2.amazonaws.com/default/recipes')
        .then((response) => response.json())
        .then((resp) => {
            let respArray = [];
            Object.keys(resp).forEach((recipeIndex) => {
                respArray.push(resp[recipeIndex])
            })
            setRecipes(respArray);
            console.log("FETCHING");
            console.log(respArray);
        })
    }

    useEffect(() => {
        if(!initialized.current){
            initialized.current = true;
            loadData();
        }
    }, [])


    return <div>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/appetizers">Appetizers</Nav.Link>
                    <Nav.Link as={Link} to="/side-dishes">Side Dishes</Nav.Link>
                    <Nav.Link as={Link} to="/entrees">Entrees</Nav.Link>
                    <Nav.Link as={Link} to="/sweets">Sweets</Nav.Link>
                    <Nav.Link as={Link} to="/add-recipe">New Recipe</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <div style={{margin: "1rem"}}>
            <DataContext.Provider value={[recipeList, setRecipes]}>
                <Outlet/>
            </DataContext.Provider>
        </div>
    </div>
}

export default RecipeSite;
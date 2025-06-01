import './css/Screen.css';
import { useState, useEffect, useRef } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
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
        })
    }

    useEffect(() => {
        if(!initialized.current){
            initialized.current = true;
            loadData();
        }
    }, [])


    return <div className="site-wrapper">
        {
        window.innerWidth > 800 ?
        <Navbar bg="dark" variant="dark" style={{fontFamily:'initial'}}>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="appetizers">Appetizers</Nav.Link>
                    <Nav.Link as={Link} to="side-dishes">Side Dishes</Nav.Link>
                    <Nav.Link as={Link} to="entrees">Entrees</Nav.Link>
                    <Nav.Link as={Link} to="sweets">Sweets</Nav.Link>
                    <Nav.Link as={Link} to="drinks">Drinks</Nav.Link>
                    <Nav.Link as={Link} to="add-recipe">New Recipe</Nav.Link>
                    <Nav.Link as={Link} to="update-recipe">Update Recipe</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        :
        <Navbar bg="dark" variant="dark" style={{fontFamily:'initial'}}>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown title="View Recipes">
                        <NavDropdown.Item href="#/appetizers">Appetizers</NavDropdown.Item>
                        <NavDropdown.Item href="#/side-dishes">Side Dishes</NavDropdown.Item>
                        <NavDropdown.Item href="#/entrees">Entrees</NavDropdown.Item>
                        <NavDropdown.Item href="#/sweets">Sweets</NavDropdown.Item>
                        <NavDropdown.Item href="#/drinks">Drinks</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Edit Recipes">
                        <NavDropdown.Item href="#/add-recipe">New Recipe</NavDropdown.Item>
                        <NavDropdown.Item href="#/update-recipe">Update Recipe</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
        }
        <div className='main-page'>
            <DataContext.Provider value={[recipeList, setRecipes]}>
                <Outlet/>
            </DataContext.Provider>
        </div>
    </div>
}

export default RecipeSite;
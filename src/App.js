import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';
import AppetizersPage from './screens/AppetizersPage';
import RecipeSite from './screens/RecipeSite';
import HomePage from './screens/HomePage';
import EntreesPage from './screens/EntreesPage';
import SweetsPage from './screens/SweetsPage';
import SidesPage from './screens/SidesPage';
import AddRecipe from './screens/AddRecipe';
import RecipePage from './screens/RecipePage';
import UpdateRecipe from './screens/UpdateRecipe';

function App() {
  return (
  <HashRouter>
    <Routes>
      <Route path="/" element={<RecipeSite />}>
        <Route index element={<HomePage />} />
        <Route path="/appetizers" element={<RecipePage type={'Appetizer'}/>} />
        <Route path="/entrees" element={<RecipePage type={'Entree'}/>} />
        <Route path="/sweets" element={<RecipePage type={'Sweet'}/>} />
        <Route path="/side-dishes" element={<RecipePage type={'Side Dish'}/>} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/update-recipe" element={<UpdateRecipe />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  </HashRouter>
  );
}

export default App;

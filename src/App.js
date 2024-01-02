import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppetizersPage from './screens/AppetizersPage';
import RecipeSite from './screens/RecipeSite';
import HomePage from './screens/HomePage';
import EntreesPage from './screens/EntreesPage';
import SweetsPage from './screens/SweetsPage';
import SidesPage from './screens/SidesPage';
import AddRecipe from './screens/AddRecipe';
import RecipePage from './screens/RecipePage';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RecipeSite />}>
        {/*<Route index element={<HomePage />} />*/}
        <Route path="appetizers" element={<RecipePage type={'Appetizer'}/>} />
        <Route path="entrees" element={<RecipePage type={'Entree'}/>} />
        <Route path="sweets" element={<RecipePage type={'Sweet'}/>} />
        <Route path="side-dishes" element={<RecipePage type={'Side'}/>} />
        <Route path="add-recipe" element={<AddRecipe />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

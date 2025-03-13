import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import About from './components/About';
import axios from 'axios';
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';

// Fetch all recipes
const getAllRecipes = async () => {
  try {
    const res = await axios.get('https://backend-sharing-1.onrender.com/recipe');
    return res.data;
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
};

// Fetch user's recipes
const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];
  
  let allRecipes = await getAllRecipes();
  return allRecipes.filter(item => item.createdBy === user._id);
};

// Fetch favorite recipes
const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav")) || [];
};

// Fetch a single recipe and its creator's email
const getRecipe = async ({ params }) => {
  try {
    const recipeRes = await axios.get(`https://backend-sharing-1.onrender.com/recipe/${params.id}`);
    let recipe = recipeRes.data;

    if (recipe?.createdBy) {
      const userRes = await axios.get(`https://backend-sharing-1.onrender.com/user/${recipe.createdBy}`);
      recipe = { ...recipe, email: userRes.data.email };
    }

    return recipe;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};

// Define routes
const router = createBrowserRouter([
  {
    path: "/", element: <MainNavigation />, children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe },
      { path: "/about", element: <About /> }
    ]
  }
]);

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle Theme Function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme on load
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <motion.div 
      className={`app ${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.button 
        className="theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Toggle Theme
      </motion.button>
      <RouterProvider router={router} />
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';
import { useLoaderData } from 'react-router-dom';

export default function RecipeDetails() {
    const recipe = useLoaderData();

    if (!recipe) {
        return <h2>Recipe Not Found</h2>;
    }

    return (
        <motion.div 
            className="outer-container"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
        >
            {/* Profile Section */}
            <motion.div 
                className="profile"
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <img src={profileImg} width="50px" height="50px" alt="Profile" />
                <h5>{recipe.email || "Unknown Author"}</h5>
            </motion.div>

            {/* Recipe Title */}
            <motion.h3 
                className="title"
                initial={{ x: -50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {recipe.title || "No Title"}
            </motion.h3>

            {/* Recipe Image */}
            {recipe.coverImage ? (
                <motion.img 
                    src={`https://backend-sharing-1.onrender.com/images/${recipe.coverImage}`} 
                    width="220px" 
                    height="200px" 
                    alt="Recipe Cover"
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.4, duration: 0.5 }}
                    onError={(e) => e.target.style.display = 'none'}
                />
            ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    No Image Available
                </motion.p>
            )}

            {/* Recipe Details */}
            <motion.div 
                className="recipe-details"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                {/* Ingredients */}
                <div className="ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.length > 0 ? (
                            recipe.ingredients.map((item, index) => (
                                <motion.li 
                                    key={index} 
                                    initial={{ x: -10, opacity: 0 }} 
                                    animate={{ x: 0, opacity: 1 }} 
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                >
                                    {item}
                                </motion.li>
                            ))
                        ) : (
                            <p>No ingredients listed.</p>
                        )}
                    </ul>
                </div>

                {/* Instructions */}
                <motion.div 
                    className="instructions"
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <h4>Instructions</h4>
                    <span>{recipe.instructions || "No instructions provided."}</span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

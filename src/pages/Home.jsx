import React, { useState } from 'react';
import { motion } from 'framer-motion';
import foodRecipe from '../assets/foodRecipe.png';
import Navbar from '../components/Navbar';
import RecipeItems from '../components/RecipeItems';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';

export default function Home() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const addRecipe = () => {
        let token = localStorage.getItem("token");
        if (token)
            navigate("/addRecipe");
        else {
            setIsOpen(true);
        }
    };

    return (
        <>
            <motion.section 
                className='home'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div className='left' initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.8 }}>
                    <h1>Delicious Recipes</h1>
                    <h5>A recipe-sharing website where food lovers can discover, share, and explore delicious recipes from around the world. Users can upload their own recipes, browse by category, and interact with a community of home cooks and chefs. The platform offers easy-to-follow instructions, ingredient lists, and cooking tips to make every meal a success. Perfect for anyone looking for inspiration in the kitchen!</h5>
                    <motion.button 
                        className="share-btn" 
                        onClick={addRecipe}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Share your recipe
                    </motion.button>
                </motion.div>
                <motion.div 
                    className='right' 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.8 }}
                >
                    <img src={foodRecipe} width="320px" height="300px" alt="Food Recipe" />
                </motion.div>
            </motion.section>

            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <InputForm setIsOpen={() => setIsOpen(false)} />
                </Modal>
            )}

            <motion.div 
                className='recipe-container'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2>Latest Recipes</h2>
                <RecipeItems />
            </motion.div>
        </>
    );
}

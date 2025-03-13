import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './RecipeItems.css';

export default function RecipeItems() {
    const recipes = useLoaderData();
    const [allRecipes, setAllRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(null);
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
    const navigate = useNavigate();

    useEffect(() => {
        setAllRecipes(recipes);
        setLoading(false);
    }, [recipes]);

    const onDelete = async (id) => {
        await axios.delete(`https://backend-sharing-1.onrender.com/recipe/${id}`);
        setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id));
        let filterItem = favItems.filter(recipe => recipe._id !== id);
        localStorage.setItem("fav", JSON.stringify(filterItem));
        setConfirmDelete(null);
    };

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id);
        favItems = favItems.some(recipe => recipe._id === item._id) ? filterItem : [...favItems, item];
        localStorage.setItem("fav", JSON.stringify(favItems));
    };

    if (loading) return <p className="loading">Loading recipes...</p>;

    return (
        <>
            <div className='card-container'>
                <AnimatePresence>
                    {allRecipes?.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className='card' 
                            onDoubleClick={() => navigate(`/recipe/${item._id}`)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={`https://backend-sharing-1.onrender.com/images/${item.coverImage}`} width="120px" height="100px" alt={item.title} />
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons'>
                                    <div className='timer'><BsStopwatchFill /> {item.time}</div>
                                    <FaHeart 
                                        onClick={() => favRecipe(item)}
                                        style={{ color: favItems.some(res => res._id === item._id) ? "red" : "" }}
                                    />
                                    <div className='action'>
                                        <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                        <MdDelete onClick={() => setConfirmDelete(item._id)} className='deleteIcon' />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Are you sure you want to delete this recipe?</p>
                        <button onClick={() => onDelete(confirmDelete)}>Yes, Delete</button>
                        <button onClick={() => setConfirmDelete(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}
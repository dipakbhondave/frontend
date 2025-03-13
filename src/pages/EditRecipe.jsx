import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            await axios.get(`https://backend-sharing-1.onrender.com/recipe/${id}`)
                .then(response => {
                    let res = response.data
                    setRecipeData({
                        title: res.title,
                        ingredients: res.ingredients.join(","),
                        instructions: res.instructions,
                        time: res.time
                    })
                })
        }
        getData()
    }, [id])

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.put(`https://backend-sharing-1.onrender.com/recipe/${id}`, recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        })
            .then(() => navigate("/myRecipe"))
    }

    return (
        <motion.div 
            className='container'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.form className='form' onSubmit={onHandleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div className='form-control' whileHover={{ scale: 1.05 }}>
                    <label>Title</label>
                    <input type="text" className='input' name="title" onChange={onHandleChange} style={{ backgroundColor: '#EBE5C2', color: 'black' }}></input>
                </motion.div>
                <motion.div className='form-control' whileHover={{ scale: 1.05 }}>
                    <label>Time</label>
                    <input type="text" className='input' name="time" onChange={onHandleChange} style={{ backgroundColor: '#EBE5C2', color: 'black' }}></input>
                </motion.div>
                <motion.div className='form-control' whileHover={{ scale: 1.05 }}>
                    <label>Ingredients</label>
                    <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} style={{ backgroundColor: '#EBE5C2', color: 'black' }}></textarea>
                </motion.div>
                <motion.div className='form-control' whileHover={{ scale: 1.05 }}>
                    <label>Instructions</label>
                    <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} style={{ backgroundColor: '#EBE5C2', color: 'black' }}></textarea>
                </motion.div>
                <motion.div className='form-control' whileHover={{ scale: 1.05 }}>
                    <label>Recipe Image</label>
                    <input type="file" className='input' name="file" onChange={onHandleChange} style={{ backgroundColor: '#EBE5C2', color: 'black' }}></input>
                </motion.div>
                <motion.button 
                    type="submit" 
                    style={{ backgroundColor: '#504B38' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >Edit Recipe</motion.button>
            </motion.form>
        </motion.div>
    )
}

import { useEffect, useState } from "react";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);
    
    
    useEffect(()=>{
        async function fetchMeals() {
        const response = await fetch('https://localhost:3000/meals');

        if (!response.ok) {
            //...
        }
        const meals = await response.json();
        setLoadedMeals(meals);
    }
        fetchMeals();
    },[]);
  return (
    <ul id="meals">
        {loadedMeals.map((meal) => (
            <li key={meal.id}>
                <div>
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                    <span>${meal.price.toFixed(2)}</span>
                </div>
            </li>
        ))}
    </ul>
  );
}
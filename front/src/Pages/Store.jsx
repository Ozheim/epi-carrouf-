import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HeaderStore from "../Components/HeaderStore.jsx";


const Store = () =>{

    const [items, setItems]=useState([]);
    const [count,setCount] = useState([]);

    useEffect(()=>{
            const fetchItems = async () =>{
                try{
                    const response = await fetch("http://localhost:5000/articles", {
                    method: "GET",
                    headers: {
                         'Content-type': 'application/json',
                    }});

                    if(!response.ok){
                        throw new Error("c'est non ")
                    }
                    const data = await response.json();
                    setItems(data);
                    console.log(data);
                }catch(error){
                    console.error("Failed to load items : ", error)
                    
                }
            }

            fetchItems();
    },[])


    const AddToCart = (item) =>{
        setCount((prevArticleInList)=>[...prevArticleInList,item])
    }

    useEffect(() => {
    console.log("Panier mis à jour :", count); //use effect pour voir en temps reel l'ajout des items dans la console, quand ta le back et possibilité de test tu peux delete fort
}, [count]);

   return (
    <div className="store-container">
        <HeaderStore />
        <div className="items-list">
            {items.length > 0 ? (
                items.map((Item) => (
                    <div key={Item._id} className="item-card">
                        <h2>{Item.title}</h2>
                        <img src={Item.image} alt={Item.title} />
                        <p>{Item.description}</p>
                        <p>{Item.price} €</p>
                        <button onClick={() => AddToCart(Item)}>Ajouter au Panier</button>
                    </div>
                ))
            ) : (
                <p className="empty-message">Aucun article trouvé</p>
            )}
        </div>
    </div>
);

}

export default Store;
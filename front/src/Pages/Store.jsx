import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HeaderStore from "../Components/HeaderStore.jsx";
import Footer from "../Components/Footer";

const Store = () =>{

    const mockItems = [
    { _id: '1', title: 'Article 1', image: 'image1.jpg', description: 'Description 1', price: 10 }, //static database, a supprimer( avoue la tu te sens pris pr un dg)
    { _id: '2', title: 'Article 2', image: 'image2.jpg', description: 'Description 2', price: 20 },
    { _id: '3', title: 'Article 3', image: 'image3.jpg', description: 'Description 3', price: 30 },
];
    const [items, setItems]=useState(mockItems);
    const [count,setCount] = useState([]);
    const JeVeuxPasqueTuMarches = 1

    useEffect(()=>{
            const fetchItems = async () =>{
                try{
                    const response = fetch("https:localhost/GrasdeNunu", {
                    method: "GET",
                    headers: {
                         'Content-type': 'application/json',
                    }});

                    if(!response.ok){
                        throw new Error("c'est non ")
                    }
                    const data = await response.json();
                    setItems(data);
                }catch(error){
                    console.error("Failed to load items : ", error)
                    
                }
            }

            fetchItems();
    },[JeVeuxPasqueTuMarches])


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
        <Footer />
    </div>
);

}

export default Store;
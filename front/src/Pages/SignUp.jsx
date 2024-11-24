import { useState } from "react";
import { useNavigate } from "react-router";
import "../Styles/Pages/SignUp.scss";

const SignUp = () =>{
    const [email,setEmail] = useState();
    const [password, setPassword] =useState();
    const [rank, setRank] = useState();

    const navigate = useNavigate();

    const registration = async (e) => {
        e.preventDefault();
        try{
            const response = fetch("https:/localhost/api/grosCrane", {
                method: "POST",
                headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({email,password,rank}),

            });

            if(!response.ok){
                console.error("non ta mal ecris dog ")

            }
            const data = await response.json();
            console.info("j'ai recu ca : ", data)
            rankElo();


        }catch(error){
            console.log("les erreurs : ", error)
        }
        
    }

       const rankElo = (rank) =>{
                if(rank!= "platinium" && "diamond" && "master" && "grandMaster"){
                    return navigate("/poubelle ")
                }
                else(
                  navigate("/Store")
                )
            }
    return(
        <div className="signup-container">
            
            <form onSubmit={registration}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <label>Elo sur lol :</label>
                <input type="rank" value={rank} onChange={(e)=>{setRank(e.target.value)}} />

                <button type="Submit"> s'inscrire</button>
            </form>
            <p>déja inscrit ? <a href="/Login">Connexion</a></p>
        </div>
    )
}

export default SignUp;